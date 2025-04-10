
<h1>UNO! 🎮</h1>
<p>
  Este es un proyecto basado en el popular juego de cartas UNO, desarrollado con <strong>Vue 3</strong> y <strong>Firebase</strong>. 
  La aplicación permite a los usuarios registrarse, iniciar sesión, crear partidas, unirse a partidas existentes y jugar en tiempo real.
</p>

<div class="icon-title">🚀 <strong>Características</strong></div>
<ul>
  <li><strong>Autenticación de usuarios:</strong> Registro e inicio de sesión con Firebase Authentication.</li>
  <li><strong>Gestión de partidas:</strong> Crear partidas con un código único y unirse a partidas existentes.</li>
  <li><strong>Jugabilidad en tiempo real:</strong> Sincronización de jugadores y estado de la partida usando Firebase Firestore.</li>
  <li><strong>Interfaz moderna:</strong> Diseño responsivo utilizando <strong>Bootstrap</strong> y estilos personalizados.</li>
  <li><strong>Protección de rutas:</strong> Acceso restringido a ciertas páginas según el estado de autenticación.</li>
</ul>

<div class="icon-title">🛠️ <strong>Tecnologías utilizadas</strong></div>
<ul>
  <li><strong>Frontend:</strong> <a href="https://vuejs.org/">Vue 3</a> con <a href="https://vitejs.dev/">Vite</a>.</li>
  <li><strong>Backend:</strong> <a href="https://firebase.google.com/">Firebase</a>.</li>
  <li><strong>Estilos:</strong> <a href="https://getbootstrap.com/">Bootstrap 5</a> y CSS personalizado.</li>
  <li><strong>Alertas:</strong> <a href="https://sweetalert2.github.io/">SweetAlert2</a>.</li>
</ul>

<div class="icon-title">📂 <strong>Estructura del proyecto</strong></div>

<pre><code>.
├── public/                # Archivos públicos
├── src/
│   ├── assets/            # Imágenes y recursos estáticos
│   ├── components/        # Componentes Vue
│   ├── firebase/          # Configuración y lógica de Firebase
│   ├── router/            # Configuración de rutas
│   ├── scripts/           # Lógica adicional (e.g., cartas del juego)
│   ├── styles/            # Archivos CSS personalizados
│   ├── App.vue            # Componente raíz
│   └── main.js            # Punto de entrada de la aplicación
├── .env                   # Variables de entorno para Firebase
├── package.json           # Dependencias y scripts del proyecto
├── vite.config.js         # Configuración de Vite
└── README.md              # Documentación del proyecto
</code></pre>

<h2>📦 Instalación y configuración</h2>
<ol>
  <li>Clona este repositorio:
    <pre><code>git clone git@github.com:carlosdev97/uno.git
cd uno</code></pre>
  </li>
  <li>Instala las dependencias:
    <pre><code>npm install</code></pre>
  </li>
  <li>Configura las variables de entorno en el archivo <code>.env</code>:
    <pre><code>VITE_FIREBASE_API_KEY="TU_API_KEY"
VITE_FIREBASE_AUTH_DOMAIN="TU_AUTH_DOMAIN"
VITE_FIREBASE_PROJECT_ID="TU_PROJECT_ID"
VITE_FIREBASE_STORAGE_BUCKET="TU_STORAGE_BUCKET"
VITE_FIREBASE_MESSAGING_SENDER_ID="TU_MESSAGING_SENDER_ID"
VITE_FIREBASE_APP_ID="TU_APP_ID"</code></pre>
  </li>
  <li>Inicia el servidor de desarrollo:
    <pre><code>npm run dev</code></pre>
  </li>
  <li>Abre <a href="http://localhost:5173">http://localhost:5173</a> en tu navegador.</li>
</ol>

<h2>🖼️ Capturas de pantalla</h2>

<h3>Pantalla de inicio de sesión</h3>
<img src="https://via.placeholder.com/800x400?text=Captura+de+Inicio+de+Sesión" alt="Login">

<h3>Crear partida</h3>
<img src="https://via.placeholder.com/800x400?text=Captura+de+Crear+Partida" alt="Crear partida">

<h3>Unirse a partida</h3>
<img src="https://via.placeholder.com/800x400?text=Captura+de+Unirse+a+Partida" alt="Unirse a partida">

<h2>🔐 Clonar con SSH</h2>
<p>Si prefieres clonar este repositorio con <strong>SSH</strong>, asegúrate de tener tu clave configurada:</p>
<pre><code>git clone git@github.com:carlosdev97/uno.git</code></pre>

<p>¿No tienes tu clave SSH aún? Sigue estos pasos:</p>
<ol>
  <li>Genera una:
    <pre><code>ssh-keygen -t ed25519 -C "tu_correo@ejemplo.com"</code></pre>
  </li>
  <li>Agrega la clave pública en GitHub: <strong>Settings > SSH and GPG keys</strong>.</li>
  <li>Inicia el agente SSH y añade tu clave:
    <pre><code>eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519</code></pre>
  </li>
</ol>

<h2>👨‍💻 Autor(es)</h2>
<p>Desarrollado por:</p> <a href="https://github.com/carlosdev97">Carlos Dev</a>.
<p><a href="https://github.com/MiguelLoaizaDev">MiguelLoaizaDev</a>.</p>
<p><a href="https://github.com/SanthiagoPerez">SanthiagoPerez</a>.</p>
<p><a href="https://github.com/Ds1808">Ds1808</a>.</p>
<p><a href="https://github.com/Hermis999">Hermis999</a>.</p>
<p><a href="https://github.com/Alvarez-03">Alvarez-03</a>.</p>
<p><a href="https://github.com/Juann-18">Juann-18</a>.</p>

<hr>
<p>¡Si te gusta este proyecto, no olvides darle una ⭐ en <a href="https://github.com/carlosdev97/uno">GitHub</a>!</p>

</body>
</html>
