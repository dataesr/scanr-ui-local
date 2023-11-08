export default function useSlider() {
  const handleActionEnd = (clientX, thumb) => {
    const {
      positions,
      shiftX,
      years,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    const sliderPosition = clientX - shiftX - left;
    const absPosition = positions.map(position => (
      Math.abs((position - sliderPosition - this[thumb].current.offsetWidth / 2))));
    const newPosition = positions[
      absPosition.indexOf(Math.min(...absPosition))]
      - this[thumb].current.offsetWidth / 2;
    const newYear = years[absPosition.indexOf(Math.min(...absPosition))];
    return { newYear, newPosition };
  }

  const handleLowTouchStart = (e) => {
    e.preventDefault();
    const { touches } = e;
    window.addEventListener('touchmove', this.handleLowTouchMove);
    window.addEventListener('touchend', this.handleLowEnd);
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { clientX, identifier } = touches[0];
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      lowYear: null,
      mouseDown: null,
      touchDown: 'low',
      touchIdentifier: identifier,
      shiftX,
    });
  }

  const handleHighTouchStart = (e) => {
    e.preventDefault();
    const { touches } = e;
    window.addEventListener('touchmove', this.handleHighTouchMove);
    window.addEventListener('touchend', this.handleHighEnd);
    const { mouseDown } = this.state;
    if (mouseDown) return;
    if (touches.length > 1) return;
    const { clientX, identifier } = touches[0];
    const shiftX = clientX - this.highThumb.current.getBoundingClientRect().left;
    this.setState({
      highYear: null,
      mouseDown: null,
      touchDown: 'high',
      touchIdentifier: identifier,
      shiftX,
    });
  }

  const handleLowTouchMove = (e) => {
    e.preventDefault();
    const { changedTouches } = e;
    const {
      mouseDown,
      touchDown,
      touchIdentifier,
      shiftX,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown) return;
    if (touchDown !== 'low') return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, clientX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        let sliderLowPosition = clientX - shiftX - left;
        if (sliderLowPosition < 0 - 10) {
          sliderLowPosition = 0 - 10;
        }
        const rightEdge = this.slider.current.offsetWidth - 10;
        if (sliderLowPosition > rightEdge) {
          sliderLowPosition = rightEdge;
        }
        this.lowThumb.current.style.left = `${sliderLowPosition}px`;
      }
    }
  }

  handleHighTouchMove = (e) => {
    e.preventDefault();
    const { changedTouches } = e;
    const {
      mouseDown,
      touchDown,
      touchIdentifier,
      shiftX,
    } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (mouseDown) return;
    if (touchDown !== 'high') return;
    for (let i = 0; i < changedTouches.length; i += 1) {
      const { identifier, clientX } = changedTouches[i];
      if (identifier === touchIdentifier) {
        let sliderHighPosition = clientX - shiftX - left;
        if (sliderHighPosition < 0 - 10) {
          sliderHighPosition = 0 - 10;
        }
        const rightEdge = this.slider.current.offsetWidth - 10;
        if (sliderHighPosition > rightEdge) {
          sliderHighPosition = rightEdge;
        }
        this.highThumb.current.style.left = `${sliderHighPosition}px`;
      }
    }
  }

  handleLowMouseDown = (e) => {
    e.preventDefault();
    const { touchDown } = this.state;
    if (touchDown) return;
    window.addEventListener('mousemove', this.handleLowMouseMove);
    window.addEventListener('mouseup', this.handleLowEnd);
    const { clientX } = e;
    const shiftX = clientX - this.lowThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'low',
      lowYear: null,
      shiftX,
    });
  }

  handleHighMouseDown = (e) => {
    e.preventDefault();
    const { touchDown } = this.state;
    if (touchDown) return;
    window.addEventListener('mousemove', this.handleHighMouseMove);
    window.addEventListener('mouseup', this.handleHighEnd);
    const { clientX } = e;
    const shiftX = clientX - this.highThumb.current.getBoundingClientRect().left;
    this.setState({
      mouseDown: 'high',
      highYear: null,
      shiftX,
    });
  }

  handleLowMouseMove = (e) => {
    e.preventDefault();
    const { clientX } = e;
    const { mouseDown, touchDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (touchDown) return;
    if (mouseDown !== 'low') return;
    let sliderLowPosition = clientX - shiftX - left;
    if (sliderLowPosition < 0 - 10) {
      sliderLowPosition = 0 - 10;
    }
    const rightEdge = this.slider.current.offsetWidth - 10;
    if (sliderLowPosition > rightEdge) {
      sliderLowPosition = rightEdge;
    }
    this.lowThumb.current.style.left = `${sliderLowPosition}px`;
  }

  handleHighMouseMove = (e) => {
    e.preventDefault();
    const { clientX } = e;
    const { mouseDown, touchDown, shiftX } = this.state;
    const { left } = this.slider.current.getBoundingClientRect();
    if (touchDown) return;
    if (mouseDown !== 'high') return;
    let sliderHighPosition = clientX - shiftX - left;
    if (sliderHighPosition < 0 - 10) {
      sliderHighPosition = 0 - 10;
    }
    const rightEdge = this.slider.current.offsetWidth - 10;
    if (sliderHighPosition > rightEdge) {
      sliderHighPosition = rightEdge;
    }
    this.highThumb.current.style.left = `${sliderHighPosition}px`;
  }

  handleLowEnd = (e) => {
    e.preventDefault();
    const { highYear, touchDown, touchIdentifier } = this.state;
    let clientX = null;
    if (touchDown) {
      const { changedTouches } = e;
      if (changedTouches[changedTouches.length - 1].identifier !== touchIdentifier) return;
      clientX = changedTouches[changedTouches.length - 1].clientX;
      window.removeEventListener('touchend', this.handleLowEnd);
      window.removeEventListener('touchmove', this.handleLowTouchMove);
    } else {
      clientX = e.clientX;
      window.removeEventListener('mousemove', this.handleLowMouseMove);
      window.removeEventListener('mouseup', this.handleLowEnd);
    }
    const { newYear, newPosition } = this.handleActionEnd(clientX, 'lowThumb');
    this.setState({
      mouseDown: null,
      touchDown: null,
      touchIdentifier: null,
      shiftX: null,
      lowYear: newYear,
      sliderLowPosition: newPosition,
    });
    this.props.handleSliderRange(
      Math.min(highYear, newYear),
      Math.max(highYear, newYear),
    );
  }

  handleHighEnd = (e) => {
    e.preventDefault();
    const { lowYear, touchDown, touchIdentifier } = this.state;
    let clientX = null;
    if (touchDown) {
      const { changedTouches } = e;
      if (changedTouches[changedTouches.length - 1].identifier !== touchIdentifier) return;
      clientX = changedTouches[changedTouches.length - 1].clientX;
      window.removeEventListener('touchmove', this.handleHighTouchMove);
      window.removeEventListener('touchend', this.handleHighEnd);
    } else {
      clientX = e.clientX;
      window.removeEventListener('mousemove', this.handleHighMouseMove);
      window.removeEventListener('mouseup', this.handleHighEnd);
    }
    const { newYear, newPosition } = this.handleActionEnd(clientX, 'highThumb');
    this.setState({
      mouseDown: null,
      touchDown: null,
      touchIdentifier: null,
      shiftX: null,
      highYear: newYear,
      sliderHighPosition: newPosition,
    });
    this.props.handleSliderRange(
      Math.min(lowYear, newYear),
      Math.max(lowYear, newYear),
    );
  }
}
