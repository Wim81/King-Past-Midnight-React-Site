import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import BooksPage from './pages/Books';
import BookDetailPage from './pages/BookDetail';
import CollectionsPage from './pages/Collections';
import CollectionDetailPage from './pages/CollectionDetail';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'books', element: <BooksPage /> },
      { path: 'book/:bookId', element: <BookDetailPage /> },
      { path: 'collections', element: <CollectionsPage /> },
      { path: 'collection/:collectionId', element: <CollectionDetailPage /> }
    ]
  },
], 
{ basename: "/king-past-midnight" });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
