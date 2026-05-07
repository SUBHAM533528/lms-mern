import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);


  const [lectureDetails, setLectureDetails] = useState(
    {
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    }
  );


  const handleChapter = (action, chapterId) => {
    if(action === 'add') {
      const title = prompt('Enter Chapter Name : ')
      if(title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }

    } else if (action === 'remove') {
        setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    }

    else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) => chapter.chapterId === chapterId ? {...chapter, collapsed: !chapter.collapsed}: chapter
      )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(prevChapters =>
        prevChapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            const updatedContent = [...chapter.chapterContent];
            updatedContent.splice(lectureIndex, 1);
            return { ...chapter, chapterContent: updatedContent };
          }
          return chapter;
        })
      );
    }
  }


  useEffect(() => {
    {/* initiate quill once */}
    if(!quillRef.current && editorRef.current) {
      quillRef.current = new Quill (editorRef.current, {
        theme: 'snow'
      });
    }
  }, [])


  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form action="" className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
            <input type="text" onChange={e => setCourseTitle(e.target.value)} value={courseTitle} placeholder='Type Here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Descriptiom</p>
          <div ref={editorRef}></div>
        </div>


        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input type="number" onChange={e => setCoursePrice(e.target.value)} value={coursePrice} placeholder='0' className='outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500' required />
          </div>

          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt=""  className='p-3 bg-blue-500 rounded cursor-pointer'/>
              <input type="file" id='thumbnailImage' onChange={e => setImage(e.target.files[0])} accept='image/*' hidden />
              <img src={image ? URL.createObjectURL(image) : ''} alt=""  className='max-h-10'/>
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500' required/>
        </div>

        {/* Adding Chapters & Lectures */}
        <div>
{chapters.map((chapter) => { // chapterIndex unused
            return (
              <div key={chapter.chapterId} className='bg-white border rounded-lg mb-4'>
                <div className='flex items-center justify-between p-4 border-b'>
                  <div className='flex items-center cursor-pointer' onClick={() => handleChapter('toggle', chapter.chapterId)}>
                    <img src={assets.dropdown_icon} width={14} alt="" className={`mr-2 transition-all ${chapter.collapsed ? '-rotate-90' : ''}`}/>
                    <span className='font-semibold'>{chapter.chapterOrder}. {chapter.chapterTitle}</span>
                  </div>

                  <div className='flex items-center gap-4'>
                    <span className='text-gray-500'>{chapter.chapterContent.length} {chapter.chapterContent.length === 1 ? 'Lecture' : 'Lectures'}</span>
                    <img src={assets.cross_icon} alt="" className='w-4 h-4 cursor-pointer' onClick={() => handleChapter('remove', chapter.chapterId)}/>
                  </div>
                </div>

                {!chapter.collapsed && (
                  <div className='p-4'>
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <div key={lectureIndex} className='flex justify-between items-center mb-2 p-2 bg-gray-50 rounded border hover:bg-gray-100'>
                        <span className='text-sm'>
                          {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>Link</a>
                          {lecture.isPreviewFree ? ' (Free Preview)' : ' (Paid)'}
                        </span>
                        <img src={assets.cross_icon} alt="" className='w-4 h-4 cursor-pointer hover:bg-red-100 p-1 rounded' onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}/>
                      </div>
                    ))}

                    <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={() => handleLecture('add', chapter.chapterId)}>
                      + Add Lecture
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={() => handleChapter('add')}>
            + Add Chapter
          </div>

          {showPopup && (
            <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50'>
              <div className='bg-white text-gray-700 p-6 rounded-lg shadow-xl relative w-full max-w-md mx-4'>
                <h2 className='text-xl font-bold mb-6 text-gray-900'>Add Lecture</h2>

                <div className='space-y-4'>
                  <div>
                    <p className='text-sm font-medium mb-1'>Lecture Title</p>
                    <input type="text" className='w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent' value={lectureDetails.lectureTitle} onChange={(e) => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}/>
                  </div>

                  <div>
                    <p className='text-sm font-medium mb-1'>Duration (minutes)</p>
                    <input type="number" min="1" className='w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent' value={lectureDetails.lectureDuration} onChange={(e) => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}/>
                  </div>

                  <div>
                    <p className='text-sm font-medium mb-1'>Lecture Url</p>
                    <input type="url" className='w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent' value={lectureDetails.lectureUrl} onChange={(e) => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}/>
                  </div>

                  <div className='flex items-center gap-2'>
                    <input type="checkbox" id="preview" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500' checked={lectureDetails.isPreviewFree} onChange={(e) => setLectureDetails({...lectureDetails, isPreviewFree: e.target.checked})}/>
                    <label htmlFor="preview" className='text-sm font-medium text-gray-700'>Free Preview</label>
                  </div>
                </div>

                <div className='flex gap-3 mt-8'>
                  <button 
                    type='button' 
                    className='flex-1 bg-gray-300 text-gray-800 px-4 py-2.5 rounded-lg hover:bg-gray-400 transition-all font-medium' 
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type='button' 
                    className='flex-1 bg-blue-500 text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-all font-medium' 
                    disabled={!lectureDetails.lectureTitle || !lectureDetails.lectureDuration || !lectureDetails.lectureUrl}
                    onClick={() => {
                      if (currentChapterId && lectureDetails.lectureTitle && lectureDetails.lectureDuration && lectureDetails.lectureUrl) {
                        setChapters(chapters.map(chapter => 
                          chapter.chapterId === currentChapterId 
                            ? { ...chapter, chapterContent: [...chapter.chapterContent, { ...lectureDetails }] }
                            : chapter
                        ));
                        setLectureDetails({ lectureTitle: '', lectureDuration: '', lectureUrl: '', isPreviewFree: false });
                        setShowPopup(false);
                      }
                    }}
                  >
                    Add Lecture
                  </button>
                </div>
                <img src={assets.cross_icon} alt="Close" className='absolute top-4 right-4 w-5 h-5 cursor-pointer hover:bg-gray-200 p-1 rounded-full transition-colors' onClick={() => setShowPopup(false)}/>
              </div>
            </div>
          )}
        </div>

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4 cursor-pointer'>Add</button>
      </form>
    </div>
  )
}

export default AddCourse