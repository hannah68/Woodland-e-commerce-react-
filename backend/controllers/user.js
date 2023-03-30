import { User }from "../models/user.js";
import { hashPassword, createToken, checkPasswordMatch } from "../utils/auth.js";

// create user without password
const createUserWithoutPass = async (user) => {
	const newUser = {
		username: user.username,
		email: user.email,
		id: user.id
	};
	return newUser;
};

// create user
export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	if (!password) {
		return res.status(400).json({ error: 'Password is required' });
	}

	const passwordHashed = await hashPassword(password);

	try {
		//check to make sure the email provided not registered
		const registeredUser = await User.findOne({ email: email });

		if (registeredUser) {
			// throw an error if the email address already registered
			return res.status(400).json({email: "A user has already registered with this email address."});
		} else {
			// create a new user
			const newUser = await new User({
				username,
				email,
				password: passwordHashed,
			});

			await newUser.save();

			const userWithoutpassword = await createUserWithoutPass(newUser);
			const token = await createToken({ id: userWithoutpassword.id });

			return res.status(200).json({ data: userWithoutpassword, token });
		}
	} catch (err) {
		console.log("error inside register user!", err);
	}
};

// log in user
export const loginUser = async ( req, res ) => {
    const { email, password } = req.body;
    
    try{
        const foundUser = await User.findOne({ email });
        if(!foundUser){
            return res.status(500).json({ error: 'Invalid email or password...'} );
        }

		// check password match
		const matchedPassword = await checkPasswordMatch(password, foundUser.password );
		if (!matchedPassword) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const userWithoutPassword = await createUserWithoutPass(foundUser);
		const token = await createToken({ id: userWithoutPassword.id });

        return res.status(200).json({ data: userWithoutPassword, token });

    }catch(err){
        console.log('An error inside user login.', err);
		return res.status(500).json({ error: "Internal Server Error" });
    }
}
