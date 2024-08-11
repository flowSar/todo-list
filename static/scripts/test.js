document.addEventListener('DOMContentLoaded', () => {

    async function getData() {
        const response = await fetch('', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        response.json()
    }

});