"use client"

type ErrorProps = {
  error : Error & { digest?: string },
  reset : ()=>void,
} 

export default function Error({error, reset}:ErrorProps) {
    console.log(error.message);
  return (
    <main className='flex justify-center items-center flex-col gap-6 mt-10'>
      <h1 className='text-3xl font-semibold'>Something went wrong!</h1>
      <p className='text-lg'>{error.message}</p>

      <button className='inline-block bg-accent-500 text-old-primary-800 px-6 py-3 text-lg' onClick={reset} >
        Try again
      </button>
    </main>
  );
}
