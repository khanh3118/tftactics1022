async function getMetaComps() {
  let res = await fetch(
    "https://limitless-brook-24542.herokuapp.com/metareport"
  );
  let data = await res.json();
  return data[0].data;
}

const services = {
  getMetaComps,
};

export default services;
