import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'swiper/css';
import 'bootstrap/js/dist/collapse';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Middleware from './Component/Middleware';

const Login = React.lazy(() => import('./Page/Login/Login'));
const DefaultLayout = React.lazy(() => import('./Component/DefaultLayout/DefaultLayout'));
const StudentScreen = React.lazy(() => import('./Page/Student/Home/Home'));
const StudentProfile = React.lazy(() => import('./Page/Student/Profile/Profile'));
const Error404 = React.lazy(() => import('./Page/Error404/Error404'));

const LibrarianHome = React.lazy(() => import('./Page/Librarian/Home/Home'));
const LibrarianProfile = React.lazy(() => import('./Page/Librarian/Profile/Profile'));
const LibrarianGroup = React.lazy(() => import('./Page/Librarian/Group/Group'));

const LibrarianUser = React.lazy(() => import('./Page/Librarian/User/User'));
const LibrarianUserForm = React.lazy(() => import('./Page/Librarian/User/UserForm'));

const LibrarianBook = React.lazy(() => import('./Page/Librarian/Book/Book'));
const LibrarianBookForm = React.lazy(() => import('./Page/Librarian/Book/BookForm'));



const TeacherHome = React.lazy(() => import('./Page/Teacher/Home/Home'));
const TeacherGroup = React.lazy(() => import('./Page/Teacher/Home/GroupDetail'));
const TeacherProfile = React.lazy(() => import('./Page/Teacher/Profile/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Middleware>
      </Middleware>
      <Routes>
        <Route path='/' element={
          <Suspense>
            <Login />
          </Suspense>
        } />
        <Route path='/' element={
          <Suspense>
            <DefaultLayout />
          </Suspense>
        }>
          <Route path='Teacher'>
            <Route path='Home' element={<Suspense><TeacherHome /></Suspense>} />
            <Route path='Group/:id' element={<Suspense><TeacherGroup /></Suspense>} />
            <Route path='Profile' element={<Suspense><TeacherProfile /></Suspense>} />
          </Route>
          <Route path='Student'>
            <Route path='Home' element={
              <Suspense>
                <StudentScreen />
              </Suspense>} />
              <Route path='Profile' element={
              <Suspense>
                <StudentProfile />
              </Suspense>} />
          </Route>

          <Route path='Librarian'>
            <Route path='Home' element={<Suspense> <LibrarianHome /></Suspense>} />

            <Route path='Profile' element={<Suspense> <LibrarianProfile /></Suspense>} />

            <Route path='User' element={<Suspense><LibrarianUser /></Suspense>} />
            <Route path='User-Form' element={<Suspense><LibrarianUserForm /></Suspense>} />
            <Route path='User-Edit/:id' element={<Suspense><LibrarianUserForm /></Suspense>} />

            <Route path='Group' element={<Suspense><LibrarianGroup /></Suspense>} />

            <Route path='Book' element={<Suspense><LibrarianBook /></Suspense>} />
            <Route path='Book-Form' element={<Suspense><LibrarianBookForm /></Suspense>} />
            <Route path='Book-Edit/:id' element={<Suspense><LibrarianBookForm /></Suspense>} />
          </Route>
        </Route>
        <Route path='*' element={
          <Suspense>
            <Error404 />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;