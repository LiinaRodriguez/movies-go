const Profile = (): JSX.Element => {

  

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      {/* Profile Header */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24  rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=nice`}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Lina</h1>
        <p className="text-gray-600">{localStorage.getItem("user") }</p>
      </div>

      {/* About Section */}
      <section className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Write a description
        </p>
      </section>

      {/* Edit Button */}
      <div className="mt-6 text-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile