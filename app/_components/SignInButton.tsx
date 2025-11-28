import { signInActionWithGoogle } from "../_lib/action";

function SignInButton() {
  
  return (
    <form action={signInActionWithGoogle} >
      <button className='flex cursor-pointer items-center w-full gap-6 text-lg border border-old-primary-300 px-10 py-4 font-medium'
  >
        <img
          src='https://authjs.dev/img/providers/google.svg'
          alt='Google logo'
          height='24'
          width='24'
          />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
