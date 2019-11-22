import Agent from 'superagent';
var qs = require('qs')

const baseUrl = "http://localhost:8060"
// const baseUrl = "http://3.230.95.77:8060"
const handleErrors = (err, res) => {
    console.log("error handling", err,res)
    if (err) {
        console.log("error handling", err)
        alert(err);
        return;
    }
    if(res){
        if(res.err){
            console.log("error handling", res.err)
            alert(res.msg)
            return;
        }

    }
}

export const requests = {
    token: localStorage.getItem("userData") || false,
    call: (method, url, body) => {

        return Agent[method](`${baseUrl}/${url}`)
            .set('Authorization', requests.token)
            .end(handleErrors)
            .send(qs.stringify(body))
            .then((res) => {
                console.log("[from Agent]", res.body);
                return res.body
            })
    },
    rawCall: (method, url, body) => {
        return Agent[method](`${baseUrl}/${url}`)
            .send(qs.stringify(body))
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