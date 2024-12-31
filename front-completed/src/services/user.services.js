import { jwtDecode } from 'jwt-decode'
import { httpService } from './http.services'


const STORAGE_KEY_USER_TOKEN = 'loggedinUser'
const USER_BASE_URL = 'users/'

export const userService = {
    login,
    logout,
    signup,
    getToken,
    saveToken,
    getLoggedInUser,
    getUsers,
    getById,
    remove,
    save,
    normalizeUser,
    getEmptyUser,
    toggleFavorites,
    getEditableUser
}

async function toggleFavorites(bookId) {
    try {
        return await httpService.patch(USER_BASE_URL + "favorites", { bookId })
    } catch (err) {
        throw new Error(err.message || 'An err occurred during toggle favorites')
    }
}

async function getUsers() {
    try {
        return await httpService.get(USER_BASE_URL)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting boards')
    }
}

async function getById(userId) {
    try {
        const user = await httpService.get(USER_BASE_URL + userId)
        return user
    } catch (err) {
        throw new Error(err.message || 'An err occurred during getting user')
    }
}

async function save(user) {
    try {
        if (user._id) {
            const updatedUser = await httpService.put(USER_BASE_URL + user._id, { ...user, _id: undefined })
            return updatedUser
        } else {
            return await httpService.post(USER_BASE_URL, user)
        }
    } catch (err) {
        throw new Error(err.message || 'An err occurred during saving user')
    }
}

async function remove(userId) {
    try {
        return await httpService.delete(USER_BASE_URL + userId)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during removing user')
    }
}

async function login(userCred) {
    try {
        const user = await httpService.post(USER_BASE_URL + 'login', userCred)
        if (user) return saveToken(user)
    } catch (err) {
        throw new Error(err.message || 'An err occurred during login')
    }
}

async function signup(userCred) {
    const user = await httpService.post(USER_BASE_URL + "signup", userCred)
    if (user) return saveToken(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_USER_TOKEN)
}

function saveToken(token) {
    sessionStorage.setItem(STORAGE_KEY_USER_TOKEN, JSON.stringify(token))
    return token
}

function getToken() {
    try {
        return JSON.parse(sessionStorage.getItem(STORAGE_KEY_USER_TOKEN))
    } catch (e) {
        return null;
    }
}

async function getLoggedInUser() {
    const token = getToken();
    if (token) {
        const miniUser = jwtDecode(token);
        const { _id } = miniUser
        return await getById(_id)

    } else {
        return null;
    }
}

function normalizeUser(input) {
    return {
        name: {
            first: input.first,
            middle: input.middle,
            last: input.last,
        },
        phone: input.phone,
        email: input.email,
        password: input.password,
        address: {
            state: input.state,
            country: input.country,
            city: input.city,
            street: input.street,
            houseNumber: input.houseNumber,
            zip: input.zip,
        },
        isBusiness: input.isBusiness,
    };
}

function getEditableUser(user) {
    return {
        ...user.name,
        ...user.address,
        phone: user.phone,
        email: user.email,
        isBusiness: user.isBusiness,
    }
}

function getEmptyUser() {
    return {
        first: "",
        middle: "",
        last: "",
        phone: "",
        email: "",
        password: "",
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
    }
}
