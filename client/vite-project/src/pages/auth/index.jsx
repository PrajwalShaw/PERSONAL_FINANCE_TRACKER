import { SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
 } from "@clerk/clerk-react";






export const Auth = ()=>{
    return (
       
        <div> 
             
        <div className="sign-in-container">
            {/* <h1>Welcome to MoneyMap</h1> */}
          <SignedOut >
             <SignInButton mode="modal"/>
             <SignUpButton mode="modal"/>{/**mode="modal" karne se it will come as a pop-up...it will not go to a new page */}
          </SignedOut>
          <SignedIn>
             <UserButton />
          </SignedIn>
        </div>
        </div>
    );
};