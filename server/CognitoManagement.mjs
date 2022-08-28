import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
} from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: process.env.userPoolId,
    ClientId: process.env.clientId
}
const userPool = new CognitoUserPool(poolData);

const handleSignUp = (email, password, uuid) => {
    let attributeList = []
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
    userPool.signUp(email, password, null, attributeList, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const cognitoUser = result.user;
            console.log(cognitoUser)
        }
    }
    )
}
export { handleSignUp }