import Agent from 'superagent';
var qs = require('qs')

const baseUrl = "http://localhost:8060"
// const baseUrl = "http://3.230.95.77:8060"
const handleErrors = (res, err) => {
    console.log("error handling", res, err)
    if (err) {
        console.log("error handling", err)
        alert("[api failed]",err)
        // alert(err);
        return;
    }
    if (res) {
        if (res.body.err) {
            console.log("error handling", res.err)
            alert("[api failed]",res.body.msg)
            return;
        }

    }
}
const responseBody = res =>{
    console.log("[body here]",res)
   return res.body};
export const requests = {
    token: localStorage.getItem("userData") || false,
    call: (method, url, body) => {
        return Agent[method](`${baseUrl}/${url}`)
            .set('Authorization', requests.token)
            .send(qs.stringify(body))
            .then(responseBody)
            // .end(handleErrors)
            .then(
              function (rBody) {
               
                return rBody
              })
    },
    rawCall: (method, url, body) => {
        return Agent[method](`${baseUrl}/${url}`)
            .send(qs.stringify(body))
            // .then(function(err, res){
            //     if (res.ok) {}
            //   })
            .then((res) => {
                console.log("[from Agent]", res.body);
                return res.body
            })
    },
    setToken() {
        requests.token = localStorage.getItem("userData")
    }
}

// const baseUrl = "http://localhost:8060"

// export default Test;