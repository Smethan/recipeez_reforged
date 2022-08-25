import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.userPoolId!,
    ClientId: process.env.clientId!
}
const userPool = new CognitoUserPool(poolData);


//so you may be thinking "why would he make an empty list here, thats stupid", and you would be right my friend
//the empty list is here because for some godforsaken reason despite the validationData attribute (argument 4 in userPool.signup)
//being optional according to documentation, it is apparently not optional. it does nothing, so i give it nothing
//also can't pass it null because something something typescript
let emptyList: CognitoUserAttribute[] = []

const handleSignUp = (email: string, password: string, uuid: string) => {
    let attributeList: CognitoUserAttribute[] = []
    const attributeEmail = new CognitoUserAttribute({
        Name: 'email',
        Value: email
    });
    const attributeUuid = new CognitoUserAttribute({
        Name: "custom:uuid",
        Value: uuid
    });
    attributeList.push(attributeEmail)
    attributeList.push(attributeUuid)
    userPool.signUp(email, password, emptyList, attributeList, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const cognitoUser = result!.user;
            console.log(cognitoUser)
        }
    }
    )
}
export { handleSignUp }