import { useState } from "react";


const Settings = (): JSX.Element => {
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de los cambios (por ejemplo, actualizar en la base de datos)
    console.log("Settings saved");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Account Settings
        </h2>

        {/* Formulario de configuración */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Sección de correo electrónico */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={localStorage.getItem("user")}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Sección de contraseña */}
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sección de tema */}
          <div>
            <label htmlFor="theme" className="block text-lg font-medium text-gray-700">
              Theme
            </label>
            <select
              id="theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="mt-2 block w-full px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Sección de notificaciones */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Notifications</label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="notifications"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="h-6 w-6 text-blue-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-4 text-gray-600 text-lg">Enable notifications</span>
            </div>
          </div>

          {/* Botón de guardar cambios */}
          <div className="text-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Configuración adicional */}
        <div className="text-center mt-12">
          <button className="text-sm text-red-500 hover:underline focus:outline-none">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

