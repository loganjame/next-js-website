
import MeetupList from '../components/meetups/MeetupList';
import {MongoClient} from 'mongodb';
import Head from 'next/head';

function HomePage(props){


    return (<>
    <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a huge list of highly active 
        React meetups'></meta>
    </Head>
    <MeetupList meetups={props.meetups}/>
    </>);
}


// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps(){

    const client = await   MongoClient.connect('mongodb+srv://mohiuddeen19:fdRqYlbPTVdqEGmS@cluster0.wdp0na4.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')    
        
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    return {
        props: {
            meetups: meetups.map( meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;