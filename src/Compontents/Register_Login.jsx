

function Register_Login({ isRegister, setValue, value, closeProfileModal }) {
    function handleValue(e, type) {
        setValue(prev => ({
            ...prev,
            [type]: e.target.value
        }));
    };

    return(
        <div className='z-20 absolute left-0 right-0 bg-slate-950 w-fit h-fit p-5'>
            <form className='text-white flex flex-col gap-2.5 relative'>
                <button className='absolute top-0 right-0' onClick={closeProfileModal}>X</button>
                <label>Enter username:</label>
                <input type="text" value={value.username} onChange={(e) => handleValue(e, "username")} className='text-black pl-2.5' />
                <label>enter password:</label>
                <input type="text" value={value.password} onChange={(e) => handleValue(e, "password")} className='text-black pl-2.5' />
                {isRegister && <label>Confirm your password</label>}
                {isRegister && <input type="text" value={value.confirmPassword} onChange={(e) => handleValue(e, "confirmPassword")} className='text-black pl-2.5' /> }
                <button type='submit' className='bg-slate-800'>{isRegister ? "Register" : "Log in"}</button>
            </form>
        </div>
    );
};

export default Register_Login;