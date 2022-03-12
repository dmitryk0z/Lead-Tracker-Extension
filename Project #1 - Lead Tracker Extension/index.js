let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})


saveBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


deleteBtn.addEventListener("dblclick", () => {
    myLeads = []
    localStorage.clear()
    render(myLeads)
})


function render(leadsList) {
    let listItems = ""
    for (i = 0; i < leadsList.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leadsList[i]}'>
                    ${leadsList[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}
