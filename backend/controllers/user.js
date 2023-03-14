import { User }from "../models/user.js";

export const registerUser = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		//check to make sure the email provided not registered
		const registeredUser = await User.findOne({ email: email });

		if (registeredUser) {
			// throw an error if the email address already registered
			return res
				.status(400)
				.json({
					email: "A user has already registered with this email address.",
				});
		} else {
			// create a new user
			const newUser = await new User({
				name,
				email,
				password,
			});

			await newUser.save();
			return res.status(200).json({ data: newUser });
		}
	} catch (err) {
		console.log("error inside register user!", err);
	}
};

export const loginUser = async ( req, res ) => {
    const { email, password } = req.body;
    // need to hash password
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(500).json({data: 'Invalid email or password...'})
        }
        return res.status(200).json({ data: user });

    }catch(err){
        console.log('An error inside user login.', err);
    }
}
