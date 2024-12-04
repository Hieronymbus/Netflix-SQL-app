

function Register_Login({ signup, setValue, value, closeProfileModal, updateValues }) {
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
                {signup && <label>Enter email:</label>}
                {signup && <input type="text" value={value.email} onChange={(e) => handleValue(e, "email")} className='text-black pl-2.5' />}
                <label>enter password:</label>
                <input type="text" value={value.password} onChange={(e) => handleValue(e, "password")} className='text-black pl-2.5' />
                {signup && <label>Confirm your password</label>}
                {signup && <input type="text" value={value.confirmPassword} onChange={(e) => handleValue(e, "confirmPassword")} className='text-black pl-2.5' /> }
                <button type='submit' className='bg-slate-800' onClick={(e) => updateValues(e, signup && 'signup')}>{signup ? "Sign up" : "Log in"}</button>
            </form>
        </div>
    );
};

export default Register_Login;