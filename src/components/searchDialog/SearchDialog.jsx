import { Fragment, useContext, useState } from "react";
import {
    Dialog,
    DialogBody,
    Input,
} from "@material-tailwind/react";
import myContext from "../../context/data/myContext";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router";

export default function SearchDialog() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const context = useContext(myContext);
    const { mode, searchkey,
        setSearchkey, getAllBlog } = context;

        const navigate = useNavigate();
    return (
        <Fragment>
            {/* Search Icon  */}
            <div onClick={handleOpen}>
                <AiOutlineSearch size={20} color="white" />
            </div>
            {/* Dialog  */}
            <Dialog className=" relative right-[1em] w-[25em]  md:right-0 md:w-0 lg:right-0 lg:w-0" open={open} handler={handleOpen} style={{ background: mode === 'light' ? '#2f3542' : '#2f3542', color: mode === 'dark' ? 'white' : 'black' }}>
                {/* Dialog Body  */}
                <DialogBody >
                    <div className="flex w-full   justify-center">
                        {/* Input  */}
                        <Input
                            value={searchkey}
                            onChange={(e) => setSearchkey(e.target.value)}
                            color="white"
                            type="search"
                            label="Type here..."
                            className=" bg-[#2C3A47]"
                            name="searchkey"
                            containerProps={{
                                className: "min-w-[288px]",
                            }}
                        />
                    </div>

                    {/* Blog Card  */}
                    <div className="flex justify-center flex-wrap  sm:mx-auto sm:mb-2 -mx-2  mt-4 mb-2 ">
                        {getAllBlog.filter((obj) => obj.blogs.title.toLowerCase().includes(searchkey)).map((item, index) => {
                            // console.log(item);
                            const {thumbnail, date, id} = item
                            return (
                                <div key={index} className="p-2 sm:w-1/4 w-full " >
                                    <div className=" container mx-auto px-4 bg-gray-200 p-2 rounded-lg ">
                                        {/* Blog Thumbnail  */}
                                        <img onClick={()=> navigate(`/bloginfo/${id}`)} className="w-20 mb-2 rounded-lg cursor-pointer" src={thumbnail} alt="" />

                                        {/* Blog Date  */}
                                        <p className="w-40 text-sm">{date}</p>

                                        {/* Blog Title  */}
                                        <h1>{item.blogs.title}</h1>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Heading  */}
                    <div className=" text-center">
                        <h1 className=" text-gray-600">Powered By Devknus</h1>
                    </div>
                </DialogBody>
            </Dialog>
        </Fragment>
    );
}