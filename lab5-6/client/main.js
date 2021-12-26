const serverUrl = "http://localhost:3000"

const request = ({ route, method, body }) => {
    fetch(`${serverUrl}/${route}`, {
        method,
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res =>
            res.json().then(data => {
                if (res.status === 201)
                    return data
                throw data
            })
            .then(data => alert(`User id: ${data.id}\nEmail: ${data.email}`))
            .catch(({ error, message }) => {
                alert(`Error occured:\nType: ${error}\nMessage: ${message}`)
            })
        )
} 

const onLoginClick = e => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    
    const payload = { email, password }
    request({
        route: "auth/login",
        method: "POST",
        body: payload,
    })
}

const onSignupClick = e => {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    
    const payload = { email, password }
    request({
        route: "auth/signup",
        method: "POST",
        body: payload,
    })
}
