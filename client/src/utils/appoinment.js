import baseAPI from "./_baseURL";

const addAppoinment = async (body)=>{
    try {
        console.log(body)
        const res = await baseAPI.post("appointment/addAppointment",body)
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export {
    addAppoinment
}