const matcher = {
    matchLoginType(val) {
        const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,10}$/;
        const phoneRegex = /^\+?[0-9]{3}-?[0-9]{6,12}$/;
        if (emailRegex.test(val)) {
            return "email";
        }
        if (phoneRegex.test(val)) {
            return "sms";
        } else {
            return null;
        }
    },
};

export default matcher;
