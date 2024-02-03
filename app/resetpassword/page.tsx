function resetPasswordPage() {
  return (
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
          <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-center text-gray-700">RESET</h1>

              <form className="space-y-4">
                  <div>
                      <label className="label">
                          <span className="text-base label-text">Email</span>
                      </label>
                      <input type="text" placeholder="Email Address" className="w-full input input-bordered"/>
                  </div>
                  <a href={"/login"} className="text-xs text-gray-600 hover:underline hover:text-blue-600">try other account </a>
                  <div>
                      <button className="btn btn-primary w-full">SEND CODE</button>
                  </div>
              </form>
          </div>
      </div>
  );
}

export default resetPasswordPage;