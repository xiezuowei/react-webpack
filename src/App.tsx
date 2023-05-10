import React from 'react';
import './styles/app.less';
import img1 from '@/assets/images/gunslinger1.png';
import img2 from '@/assets/images/gunslinger2.png';

const App: React.FC = () => {
    const a = 'a';

    return (
        <div>
            <div>
                <img src={img1} alt="枪女1" />
            </div>
            <div>
                <img src={img2} alt="枪女2" />
            </div>
            <div>{a}</div>
        </div>
    );
};

export default App;
