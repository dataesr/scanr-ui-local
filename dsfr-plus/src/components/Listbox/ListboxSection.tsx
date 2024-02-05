import { useListBoxSection } from 'react-aria';
import ListboxOption from './ListboxOption';

export default function ListBoxSection({ section, state }: { section: any, state: any }) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label']
  });

  // If the section is not the first, add a separator element to provide visual separation.
  // The heading is rendered inside an <li> element, which contains
  // a <ul> with the child items.
  return (
    <>
      {section.key !== state.collection.getFirstKey() &&
        (
          <li
            role="presentation"
            style={{
              borderTop: '1px solid gray',
              margin: '2px 5px'
            }}
          />
        )}
      <li {...itemProps}>
        {section.rendered &&
          (
            <span
              {...headingProps}
              style={{
                fontWeight: 'bold',
                fontSize: '1.1em',
                padding: '2px 5px'
              }}
            >
              {section.rendered}
            </span>
          )}
        <ul
          {...groupProps}
          style={{
            padding: 0,
            listStyle: 'none'
          }}
        >
          {[...section.childNodes].map((node) => (
            <ListboxOption
              key={node.key}
              item={node}
              state={state}
            />
          ))}
        </ul>
      </li>
    </>
  );
}