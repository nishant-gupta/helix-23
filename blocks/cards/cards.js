import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
    const p = document.createElement('p');
    p.innerHTML = placeholders.sample ? placeholders.sample : 'SAMPLE';
    li.append(p);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
