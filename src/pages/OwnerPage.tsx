import React, { useState, useRef } from 'react';

function OwnerPage(): JSX.Element {
  const [selected, setSelected] = useState<string>('내 정보 관리');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('이미지들어와?:', file);
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200">
      <div className="w-3/4 h-20 bg-white text-black px-8 py-4 mt-10 mx-auto rounded-lg shadow-lg">
        <div className="text-center w-44 border-black mx-auto">
          안녕하세요 커핑닉네임 님!
        </div>
      </div>
      <div className="w-3/4 mx-auto">
        <div className="flex flex-grow w-full">
          <div className="flex flex-col w-64 bg-gray-200 px-4 py-2">
            <button
              type="submit"
              className="my-1"
              onClick={() => setSelected('내 정보 관리')}
            >
              내 정보 관리
            </button>
            <button
              type="submit"
              className="my-1"
              onClick={() => setSelected('카페 정보 관리')}
            >
              카페 정보 관리
            </button>
          </div>
          <div className="flex-grow">
            {selected === '내 정보 관리' && (
              <div>
                내 정보 관리
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  ref={hiddenFileInput}
                />
                {selectedFile && <p>{selectedFile.name}</p>}
                <button type="submit" onClick={handleClick}>
                  <img
                    src="/src/img/my-profill.png"
                    alt="charac"
                    className="w-full"
                    style={{ width: '200px', height: 'auto' }}
                  />
                </button>
              </div>
            )}
            {selected === '카페 정보 관리' && (
              <div>Showing 카페 정보 관리 content</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerPage;
