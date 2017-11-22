import React from 'react';

class LogComponent {
    debug(title, message) {
        console.log(title, message)//NOSONAR
    }
}

export default new LogComponent();