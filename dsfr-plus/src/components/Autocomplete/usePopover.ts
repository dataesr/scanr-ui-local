import {
    useRef,
    useState,
    CSSProperties,
    useLayoutEffect,
    useEffect,
    useCallback,
    AriaAttributes,
    Ref,
} from 'react'


const useEscapeHandler = (handler: () => void) => {
    const escapeHandler = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            console.log("escapeHandlerClosing");
            handler?.()
        }
    }

    useEffect(() => {
        document?.addEventListener('keyup', escapeHandler)
        return () => document?.removeEventListener('keyup', escapeHandler)
    }, [])
}

const useClickOutside = <E extends HTMLElement, C extends HTMLElement>(triggerRef: React.RefObject<C>, handler: (e: MouseEvent) => void) => {
    const callbackRef = useRef(handler)
    const ref = useRef<E>(null)
    const outsideClickHandler = (e: MouseEvent) => {
        if (triggerRef?.current?.contains(e.target as Node)) {
            return
        }
        if (
            callbackRef.current &&
            ref.current &&
            !ref.current.contains(e.target as Node)
        ) {
            callbackRef.current(e)
        }
    }

    // useEffect wrapper to be safe for concurrent mode
    useEffect(() => {
        callbackRef.current = handler
    })

    useEffect(() => {
        document?.addEventListener('click', outsideClickHandler)
        return () => document?.removeEventListener('click', outsideClickHandler)
    }, [])

    return ref
}

const style: CSSProperties = {
    position: 'absolute',
    top: 'auto',
    bottom: 'auto',
    left: 'auto',
    right: 'auto',
    minWidth: "250px",
}

const role: AriaAttributes['aria-haspopup'] = 'listbox'

interface TriggerProps<T> {
    ref: Ref<T>
    onClick(): void
    'aria-haspopup': AriaAttributes['aria-haspopup']
    'aria-expanded': boolean
}

interface ContentProps<C> {
    ref: Ref<C>
}
export type UsePopover<C, T> = {
    open: boolean
    close(): void
    toggle(): void
    trigger: TriggerProps<T>
    content: ContentProps<C>
}


export const usePopover = <T extends HTMLElement, C extends HTMLElement>(defaultOpen = false): UsePopover<C, T> => {
    const triggerRef = useRef<T>(null)
    const [position, setPosition] = useState<CSSProperties>({
        top: 'auto',
        left: 'auto',
    })

    useLayoutEffect(() => {
        if (triggerRef.current) {
            setPosition({
              width: triggerRef?.current?.getBoundingClientRect()?.width,
              top: triggerRef?.current?.getBoundingClientRect()?.bottom,
              left: triggerRef?.current?.getBoundingClientRect()?.left,
              height: "400px",
              zIndex: 10000
            } as CSSProperties)
        }
    }, [])

    const [open, setOpen] = useState(defaultOpen)
    const toggle = useCallback(() => setOpen(prev => !prev), [])
    const close = useCallback(() => setOpen(false), [])
    const opening = useCallback(() => setOpen(false), [])

    useEscapeHandler(close)

    const contentRef = useClickOutside<C, T>(triggerRef, close)

    const trigger = {
        ref: triggerRef,
        onClick: toggle,
        onFocus: opening,
        onBlur: close,
        'aria-haspopup': role,
        'aria-expanded': open,
    }
    const content = {
        ref: contentRef,
        role,
        style: { ...style, ...position },
    }
    return {open, close, toggle, trigger, content}
}