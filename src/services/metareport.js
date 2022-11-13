async function getMetaComps() {
  let res = await fetch(
    "http://13.212.204.133:8080/metareport"
  );
  let data = await res.json();
  return data[0].data;
}

const services = {
  getMetaComps,
};

export default services;
