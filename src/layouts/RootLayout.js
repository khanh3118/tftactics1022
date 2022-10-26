import './RootLayout.scss';
import Header from '../components/Header';

function RootLayout() {
  return (
    <div id="root-layout">
      <Header />
      <div className='content'></div>
      <div className='footer'></div>
    </div>
  );
}

export default RootLayout;