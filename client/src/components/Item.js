import {PostPlans, UpdatePlans, DeletePlans, GetPlans} from "../api.js"


export default function Item({arr, setArr, ActivateEdit}) {
    
    async function Delete(plan_id) {
        await DeletePlans(plan_id);
        setArr(arr.filter((x) => x._id !== plan_id));   
        
        
    }
    return(
        

        <div className="plan-wrpr">
            {arr.map(x => <div className="plan">
                <p className="plan-txt" key={x._id}>{x.name}</p>
                 <button className="btn btn-close" onClick={() => Delete(x._id)}>x</button> 
                 <button className="btn btn-edit" onClick={() => ActivateEdit(x._id)}>edit</button>
            </div>)}
        </div> 
    );
}