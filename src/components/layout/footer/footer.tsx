import Widgets from '@components/layout/footer/widget/widget';
import Copyright from '@components/layout/footer/copyright';
import { footer } from './data';
const { widgets, payment } = footer;

const Footer: React.FC = () => (
  <footer className="mt-[50px] lg:mt-14 2xl:mt-16">
    <Widgets widgets={widgets} />
    <Copyright payment={payment} />
  </footer>
);

export default Footer;
