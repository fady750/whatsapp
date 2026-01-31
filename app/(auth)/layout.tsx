export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html className="" lang="en">
        <body
            className={` overflow-hidden flex w-full h-screen min-h-screen text-primary-250 font-sans bg-[#171717]`}
        >
            {children}    
        </body>
    </html>
  );
}