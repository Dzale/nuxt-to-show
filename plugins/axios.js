
export default function ({ $axios, redirect, app}) {
  $axios.onResponse(data => {
    //app.$notify.error({message: 'TEST'});
    return data.data;
  })
}