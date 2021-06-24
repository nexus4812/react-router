import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link, BrowserRouter as Router, useLocation} from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <QueryParamsDemo />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);


function createTo(query:URLSearchParams, name: string, value: string):string {
    if(query.has(name)) {
        query.delete(name);
    }

    query.append(name, value);
    return "?"+query.toString();
}

function QueryParamsDemo() {
    const [httpbinResponse, setHttpbinResponse] = useState<any>({url : ''});

    const location = useLocation();

    const query = new URLSearchParams(location.search);

    useEffect( () => {
        const f = async () => {
            const q = new URLSearchParams(location.search);
            const response = await fetch(`https://httpbin.org/get?${q.toString()}`)
            const date = await response.json();
            setHttpbinResponse(date);
        };

        f();
    }, [location.search]);

    return (
        <>
            <ul>
                <li>
                    <Link to={createTo(query, 'name', "taro")}>Add Name taro</Link>
                </li>
                <li>
                    <Link to={createTo(query, 'name', "kuro")}>Add Name kuro</Link>
                </li>
                <li>
                    <Link to={createTo(query, 'site', "google")}>Add site google</Link>
                </li>
                <li>
                    <Link to={createTo(query, 'site', "yahoo")}>Add site yahoo</Link>
                </li>
            </ul>

            <div>
                {httpbinResponse.url}
            </div>
        </>
    );
}