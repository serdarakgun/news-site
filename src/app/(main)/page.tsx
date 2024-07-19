'use client';
import React, { useEffect, useState, useRef } from "react";
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import PostCards from "@/src/components/postCards";
import { fetchNews } from "@/src/redux/news-store";
import { reduxStore } from '@/src/redux';
import { useDispatch } from "react-redux";


interface NewsItem {
    key: string;
    url: string;
    description: string;
    image: string;
    name: string;
    source: string;
}

interface City {
    label: string;
    value: string;
}

interface Profile {
    name: string;
}

const RootController = () => {
    const [selectedProfile, setSelectedProfile] = useState<City[] | null>(null);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [chips, setChips] = useState<Profile[]>([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const newsContainerRef = useRef<HTMLDivElement>(null);
    const hasFetchedInitialPage = useRef(false); //useeffectten 1 tane fecthlemesi için
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    const [showButton,setShowButton]=useState(false)

    useEffect(() => {
        if (!hasFetchedInitialPage.current) {
            console.log("Fetching initial page", pageNumber);
            fetchNewsData(pageNumber);
            hasFetchedInitialPage.current = true;
        }
    }, [pageNumber]);

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling behavior
        });
    };

    const handleScroll = () => {//hızlı hızlı scrollayınca birden fazla sayfa gelmesin diye
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
            setLoading(true)
        }
        if(document.documentElement.scrollTop>1300){
            setShowButton(true)
        }
        else{
            setShowButton(false)
        }
        debounceTimeout.current = setTimeout(() => {
            console.log(document.documentElement.scrollTop);
            
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPageNumber(prev => prev + 1);
                hasFetchedInitialPage.current = false;
            }
        }, 1000); 
    };

    useEffect(() => {
        
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll); // Cleanup function    
            
        
    }, []);

    const fetchNewsData = async (page: number) => {
        setLoading(true);
        try {
            const resultAction = await reduxStore.dispatch(fetchNews(page));
            if (fetchNews.fulfilled.match(resultAction)) {
                const newsData = resultAction.payload;
                setNews(prev => [...prev, ...newsData.result]);

                // multiselectin optionlarının seçildiği yer
                const uniqueProfiles = new Map<string, boolean>();
                newsData.result.forEach((e) => {
                    uniqueProfiles.set(e.source, true);
                });
                setChips(Array.from(uniqueProfiles.keys()).map(name => ({ name })));
            } else {
                console.error("Failed to fetch news:", resultAction.error);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scroll-smooth">
            {showButton && ( // Conditionally render the scroll button
                <Button
                    icon="pi pi-angle-double-up"
                    aria-label="Scroll to Top"
                    className="fixed bottom-5 right-5"
                    onClick={handleScrollTop}
                />
            )}
            <div className="grid card px-4 py-1">
                <div className="col-6 flex justify-content-start align-items-center">Gündelik Haberler</div>
                <div className="col-6 flex justify-content-end">
                    <MultiSelect
                        value={selectedProfile}
                        onChange={(e) => setSelectedProfile(e.value)}
                        options={chips}
                        optionLabel="name"
                        display="chip"
                        placeholder="Haber Kaynakları"
                        maxSelectedLabels={3}
                        className="w-full md:w-20rem"
                    />
                </div>
            </div>
            
                <div ref={newsContainerRef} className="grid card p-3" style={{ overflowY: 'auto' }}>
                {news.map((e, index) => (
                    <PostCards
                        key={`${e.key}-${pageNumber}-${index}`} // key-sayfa sayısı-index   
                        url={e.url}
                        description={e.description}
                        image={e.image}
                        name={e.name}
                        source={e.source}
                    />
                ))}
                {loading && <p>Loading...</p>}
            </div>
            
        </div>
    );
};

export default RootController;
