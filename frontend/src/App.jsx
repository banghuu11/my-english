import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/auth/Register.jsx';
import Login from './pages/auth/Login.jsx';
import './App.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Home from './pages/Home.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import StudentList from './pages/admin/student/StudentList.jsx';
import AddStudent from './pages/admin/student/AddStudent.jsx';
import EditStudent from './pages/admin/student/EditStudent.jsx';
import ViewStudent from './pages/admin/student/ViewStudent.jsx';
import PublicLayout from './layout/PublicLayout.jsx';
import { AdminLayout } from './pages/admin';
import Dashboard from './pages/admin/Dashboard.jsx';
import WordList from './pages/admin/word/WordList.jsx';
import AddWord from './pages/admin/word/AddWord.jsx';
import EditWord from './pages/admin/word/EditWord.jsx';
import ViewWord from './pages/admin/word/ViewWord.jsx';

// Thêm import cho topic CRUD components
import TopicList from './pages/admin/topic/TopicList.jsx';
import AddTopic from './pages/admin/topic/AddTopic.jsx';
import EditTopic from './pages/admin/topic/EditTopic.jsx';
import ViewTopic from './pages/admin/topic/ViewTopic.jsx';

function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user?.role !== 'Admin') return <Home />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public site layout */}
          <Route element={<PublicLayout />}> 
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Admin layout with protected routes */}
          <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="/admin" element={<Dashboard />} />

            {/* Student CRUD */}
            <Route path="/admin/student" element={<StudentList />} />
            <Route path="/admin/student/:id" element={<ViewStudent />} />
            <Route path="/admin/student/add" element={<AddStudent />} />
            <Route path="/admin/student/:id/edit" element={<EditStudent />} />

            {/* Word CRUD */}
            <Route path="/admin/word" element={<WordList />} />
            <Route path="/admin/word/add" element={<AddWord />} />
            <Route path="/admin/word/:id/edit" element={<EditWord />} />
            <Route path="/admin/word/:id" element={<ViewWord />} />

            {/* Topic CRUD */}
            <Route path="/admin/topic" element={<TopicList />} />
            <Route path="/admin/topic/add" element={<AddTopic />} />
            <Route path="/admin/topic/:id/edit" element={<EditTopic />} />
            <Route path="/admin/topic/:id" element={<ViewTopic />} />

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;