import React from 'react';
import './Button.css'; 
//import Second from './components/second';

function SecButton() {
    return (
    <table className='buttons'>
        <tr>
            <td className='tdcss'>
                <div class='boxbill'>
                    <div className='navMenu'>
                        <a href=" " color="black">Edit Reply</a>
                    </div>
                </div>
            </td>
            <td>
                <div class='boxbill'>
                     <div className='navMenu'>
                        <a href=" " color="black">Edit Current Status</a>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    );
}

export default SecButton;