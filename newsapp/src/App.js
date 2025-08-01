// import './App.css';
// import React, { Component } from 'react'
// import Navbar from './components/Navbar';
// import News from './components/News';
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
// import LoadingBar from "react-top-loading-bar";


// const RootLayout = () => (
//   <>
//     <Navbar />
//     <LoadingBar
//       color="#f11946"
//       progress={this.state.progress}
//     />
//     <Outlet />  {/* this renders the child routes */}
//   </>
// );
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout setProgress={this.state.setProgress}/>,
//     children: [
//       {
//         path: "/",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} category="general" />
//         </>
//       },
//       {
//         path: "/business",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={5} category="business" />
//         </>
//       },
//       {
//         path: "/entertainment",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} category="entertainment" />
//         </>
//       },
//       {
//         path: "/health",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} category="health" />
//         </>
//       },
//       {
//         path: "/science",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} category="science" />
//         </>
//       },
//       {
//         path: "/sports",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={5} category="sports" />
//         </>
//       },
//       {
//         path: "/technology",
//         element: <>
//           <News  setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} category="technology" />
//         </>
//       },
//     ]
//   }
// ]);

// export default class App extends Component {
//   state = {
//     progress: 0,
//   }
//   setProgress = (progress) => {
//     this.setState({ progress: progress })
//   }
//   render() {
//     return <RouterProvider router={router} />;
//   }
// }

import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";

const RootLayout = ({ progress }) => (
  <>
    <Navbar />
    <LoadingBar color="#f11946" height={3} progress={progress} />
    <Outlet />
  </>
);

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout progress={this.state.progress}/>,
        children: [
          {
            path: '/',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} category="general" />,
          },
          {
            path: '/business',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={5} category="business" />,
          },
          {
            path: '/entertainment',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} category="entertainment" />,
          },
          {
            path: '/health',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} category="health" />,
          },
          {
            path: '/science',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} category="science" />,
          },
          {
            path: '/sports',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={5} category="sports" />,
          },
          {
            path: '/technology',
            element: <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} category="technology" />,
          }
        ]
      }
    ]);

    return <RouterProvider router={router} />;
  }
}
