//  https://main--helix-23--nishant-gupta.hlx.live/lists/countries-list.json

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  //  fetch nav content
  //  const navPath = getMetadata('nav') || '/nav';
  const resp = await fetch('/lists/countries-list.json');

  if (resp.ok) {
    const json = await resp.json();
    /* change to ul, li */
    const ul = document.createElement('ul');
    json.data.forEach((row) => {
      const li = document.createElement('li');
      li.innerHTML = `${row.Country}  (${row.Population})`;
      ul.append(li);
    });
    block.append(ul);
  }
}
