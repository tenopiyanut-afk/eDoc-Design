function setupImageOptions({regions, host, panel, save, getZoom}) {
  panel.innerHTML = `<h3>Image options</h3><label class="image-option-label" for="image-select">Image</label><select id="image-select" aria-label="Select image"><option value="">Select an image</option></select><div id="image-controls" hidden><div class="image-options-heading">Size <small>(inches)</small></div><div class="image-dimensions"><label>Width<input id="image-width" type="number" min="0.01" step="0.01" inputmode="decimal"></label><label>Height<input id="image-height" type="number" min="0.01" step="0.01" inputmode="decimal"></label></div><label class="image-lock"><input type="checkbox" id="image-lock" checked> Lock aspect ratio</label><div class="image-options-heading">Text wrapping</div><div class="image-wrap-options"><button type="button" data-image-wrap="inline">In line</button><button type="button" data-image-wrap="wrap">Wrap text</button><button type="button" data-image-wrap="break">Break text</button><button type="button" data-image-wrap="behind">Behind text</button><button type="button" data-image-wrap="front">In front of text</button></div><button type="button" class="button wide image-move" id="image-move" hidden>Move image</button><p class="image-move-hint" id="image-move-hint" hidden></p></div><p class="hint" id="image-empty">Select an image in the document to adjust it.</p>`;
  const find = selector => panel.querySelector(selector);
  const selectBox = find('#image-select'), controls = find('#image-controls');
  const widthInput = find('#image-width'), heightInput = find('#image-height');
  const lock = find('#image-lock'), moveButton = find('#image-move'), hint = find('#image-move-hint');
  let selected = null, moveArmed = false;
  const images = () => regions.flatMap(region => [...region.querySelectorAll('img')]);
  const dims = image => ({width: image.offsetWidth || image.naturalWidth || 96, height: image.offsetHeight || image.naturalHeight || 96});
  function refresh() {
    const all = images(), old = selected;
    selectBox.innerHTML = '<option value="">Select an image</option>';
    all.forEach((image, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = image.alt || `Image ${index + 1}`;
      selectBox.appendChild(option);
    });
    if (old && all.includes(old)) selectBox.value = String(all.indexOf(old));
    else if (old) select(null);
  }
  function updateControls() {
    const hasImage = !!selected && selected.isConnected;
    controls.hidden = !hasImage;
    find('#image-empty').hidden = hasImage;
    if (!hasImage) return;
    const size = dims(selected), mode = selected.dataset.imageWrap || 'inline';
    widthInput.value = (size.width / 96).toFixed(2);
    heightInput.value = (size.height / 96).toFixed(2);
    panel.querySelectorAll('[data-image-wrap]').forEach(button => {
      const active = button.dataset.imageWrap === mode;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const movable = ['behind', 'front'].includes(mode);
    moveButton.hidden = !movable;
    moveButton.textContent = moveArmed ? 'Cancel move' : 'Move image';
    hint.hidden = !movable && mode !== 'wrap';
    hint.textContent = mode === 'wrap' ? 'Drag the image left or right to change the text wrap side.' : moveArmed ? 'Drag anywhere on this page to move the image.' : 'Drag the image, or select Move image and drag on the page.';
  }
  function select(image) {
    if (selected) selected.classList.remove('image-selected');
    selected = image;
    moveArmed = false;
    if (selected) {
      selected.classList.add('image-selected');
      selected.setAttribute('draggable', 'false');
    }
    refresh();
    selectBox.value = selected ? String(images().indexOf(selected)) : '';
    updateControls();
  }
  function persist() {
    if (!selected) return;
    const region = selected.closest('.section-region');
    if (region && region.dataset.part !== 'body') {
      const sheet = region.closest('[data-layout-section]');
      regions.filter(other => other !== region && other.dataset.part === region.dataset.part && other.closest('[data-layout-section]').dataset.sectionIndex === sheet.dataset.sectionIndex).forEach(other => {
        const clone = region.cloneNode(true);
        clone.querySelectorAll('.image-selected').forEach(image => image.classList.remove('image-selected'));
        other.innerHTML = clone.innerHTML;
      });
    }
    save();
  }
  function setMode(mode) {
    if (!selected) return;
    const region = selected.closest('.section-region');
    const imageRect = selected.getBoundingClientRect(), regionRect = region.getBoundingClientRect(), zoom = getZoom() / 100;
    const size = dims(selected);
    selected.style.width = `${size.width}px`;
    selected.style.height = `${size.height}px`;
    selected.style.removeProperty('float'); selected.style.removeProperty('clear'); selected.style.removeProperty('position');
    selected.style.removeProperty('left'); selected.style.removeProperty('top'); selected.style.removeProperty('z-index');
    selected.style.removeProperty('display'); selected.style.removeProperty('margin');
    selected.dataset.imageWrap = mode;
    if (mode === 'inline') selected.style.display = 'inline-block';
    if (mode === 'wrap') { selected.style.float = 'left'; selected.style.margin = '0 12px 8px 0'; }
    if (mode === 'break') { selected.style.display = 'block'; selected.style.clear = 'both'; selected.style.margin = '8px 0'; }
    if (mode === 'behind' || mode === 'front') {
      selected.style.position = 'absolute';
      selected.style.left = `${Math.max(0, (imageRect.left - regionRect.left) / zoom)}px`;
      selected.style.top = `${Math.max(0, (imageRect.top - regionRect.top) / zoom)}px`;
      selected.style.zIndex = mode === 'behind' ? '-1' : '2';
    }
    moveArmed = false;
    persist(); updateControls();
  }
  function setDimension(axis, value) {
    if (!selected || !Number.isFinite(value) || value <= 0) { updateControls(); return; }
    const size = dims(selected), ratio = size.width / size.height;
    const pixels = value * 96;
    selected.style[axis] = `${pixels}px`;
    if (lock.checked && ratio > 0) selected.style[axis === 'width' ? 'height' : 'width'] = `${axis === 'width' ? pixels / ratio : pixels * ratio}px`;
    persist(); updateControls();
  }
  widthInput.onchange = () => setDimension('width', Number(widthInput.value));
  heightInput.onchange = () => setDimension('height', Number(heightInput.value));
  selectBox.onchange = () => select(selectBox.value === '' ? null : images()[Number(selectBox.value)]);
  panel.querySelectorAll('[data-image-wrap]').forEach(button => button.onclick = () => setMode(button.dataset.imageWrap));
  moveButton.onclick = () => { moveArmed = !moveArmed; updateControls(); };
  host.addEventListener('click', e => { const image = e.target.closest('.section-region img'); if (image && !moveArmed) { e.preventDefault(); select(image); } });
  host.addEventListener('pointerdown', e => {
    if (e.button !== 0) return;
    const clicked = e.target.closest('.section-region img');
    if (clicked && !moveArmed) select(clicked);
    if (!selected) return;
    const mode = selected.dataset.imageWrap || 'inline', region = selected.closest('.section-region');
    if (!region || (!clicked && (!moveArmed || !region.contains(e.target))) || !['wrap', 'front', 'behind'].includes(mode)) return;
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX, startY = e.clientY, zoom = getZoom() / 100;
    const left = parseFloat(selected.style.left) || 0, top = parseFloat(selected.style.top) || 0;
    const move = event => {
      if (mode === 'wrap') {
        const right = event.clientX > region.getBoundingClientRect().left + region.getBoundingClientRect().width / 2;
        selected.style.float = right ? 'right' : 'left';
        selected.style.margin = right ? '0 0 8px 12px' : '0 12px 8px 0';
      } else {
        selected.style.left = `${Math.max(0, left + (event.clientX - startX) / zoom)}px`;
        selected.style.top = `${Math.max(0, top + (event.clientY - startY) / zoom)}px`;
      }
    };
    const finish = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', finish); moveArmed = false; persist(); updateControls(); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', finish, {once:true});
  });
  refresh();
  return {select, refresh};
}
