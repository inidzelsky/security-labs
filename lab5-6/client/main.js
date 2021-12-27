const serverUrl = "http://localhost:3000"

const request = ({ route, method, body }) => {
    return fetch(`${serverUrl}/${route}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res =>
            res.json().then(data => {
                if (res.status.toString().startsWith("2"))
                    return data
                throw data
            }))
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
        .then(data => {
            window.localStorage.setItem("userId", data.id)
            alert(`User id: ${data.id}\nEmail: ${data.email}`)
        })
        .catch(({ error, message }) => alert(`Error occured:\nType: ${error}\nMessage: ${message}`))
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
        .then(data => {
            window.localStorage.setItem("userId", data.id)
            alert(`User id: ${data.id}\nEmail: ${data.email}`)
        })
        .catch(({ error, message }) => alert(`Error occured:\nType: ${error}\nMessage: ${message}`))
}

const onSetPhoneClick = e => {
    e.preventDefault()

    const phone = document.querySelector("#phone").value

    const userId = window.localStorage.getItem("userId")
    const payload = { phone }

    request({
        route: `profile/${userId}/phone`,
        method: "POST",
        body: payload,
    })
        .then(data => {
            alert(`Status: ${data.status}`)
        })
        .catch(({ error, message }) => alert(`Error occured:\nType: ${error}\nMessage: ${message}`))
}

const onGetPhoneClick = e => {
    e.preventDefault()

    const userId = window.localStorage.getItem("userId")

    request({
        route: `profile/${userId}/phone`,
        method: "GET",
    })
        .then(data => {
            alert(`Phone: ${data.phone}`)
        })
        .catch(({ error, message }) => alert(`Error occured:\nType: ${error}\nMessage: ${message}`))
}
