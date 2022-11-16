async function getMetaComps() {
  let res = await fetch("https://tftactic-crawl-meta.herokuapp.com/metareport");
  let data = await res.json();
  return data[data.length - 1].data;
}

const services = {
  getMetaComps,
};

export default services;
