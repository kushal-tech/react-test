
const local = window.localStorage

class LocalStorage {
    addUser(userObj) {
        const users = this.getUser()
        if(users) {
            let findUserIndex = users.findIndex(item=>item.empId===userObj.empId)
            if(findUserIndex>=0) {
                users.splice(findUserIndex, 1, userObj)
                local.setItem("users", JSON.stringify(users))
            } else {
                users.push(userObj)
                local.setItem("users", JSON.stringify(users))
            }
        } else {
            const arr = [userObj]
            local.setItem("users", JSON.stringify(arr))
        }
    }

    getUser() {
        return local.getItem("users") ? JSON.parse(local.getItem("users")) : null
    }

    getUserById(empId) {
        const users = this.getUser()
        if(users) {
            return users.find(item=>item.empId===empId)
        }
        return null
    }

    deleteUser(empId) {
        const users = this.getUser()
        if(users) {
            let findUserIndex = users.findIndex(item=>item.empId===empId)
            if(findUserIndex>=0) {
                users.splice(findUserIndex, 1)
                local.setItem("users", JSON.stringify(users))
            }
        }
    }
}

export default new LocalStorage()