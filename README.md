# MyToonTalk
<div align=center>
  <img src="https://user-images.githubusercontent.com/78009532/236739320-dab25da3-fc44-4e91-8f36-5290887e6a38.png">
</div>

<br>

<div align=center>
  Mytoontalk은 자신만의 4컷 만화를 그리면서 각 컷마다 목소리를 녹음하여 재미있게 더빙 효과를 주는 아이패드용 더빙만화 앱입니다.

  기기가 오프라인 상태일때도 앱을 사용할 수 있습니다.
</div>

<br>

# 목차
- [시연 영상](#시연-영상)
- [기능](#기능)
- [동기](#동기)
- [챌린지](#챌린지)
  - [1. 데이터 파일을 어떻게 저장해야할까?](#1-데이터-파일을-어떻게-저장해야할까)
    - [1) FileSystem의 로컬 디바이스 메모리 문제를 어떻게 해결해야할까?](#1-filesystem의-로컬-디바이스-메모리-문제를-어떻게-해결해야할까)
  - [2. 만화 페이지별 이미지와 오디오 상태 관리 및 데이터 구조](#2-만화-페이지별-이미지와-오디오-상태-관리-및-데이터-구조)
  - [3. 만화 페이지별 그림판 undo, redo](#3-만화-페이지별-그림판-undo-redo)
  - [4. 오디오 관련 반복 로직을 줄이자](#4-오디오-관련-반복-로직을-줄이자)
  - [5. 사용자 경험 고민들](#5-사용자-경험-고민들)
    - [1) 어떻게 사용자에게 해당 페이지의 오디오가 재생되고 있음을 알려줄 수 있을까?](#1-어떻게-사용자에게-해당-페이지의-오디오가-재생되고-있음을-알려줄-수-있을까)
    - [2) 재생되고 있는 오디오를 멈추고 다른 오디오를 재생시킬 수 있을까?](#2-재생되고-있는-오디오를-멈추고-다른-오디오를-재생시킬-수-있을까)
    - [3) 그림판 도구들을 사용자 편의성에 맞게 개선하기](#3-그림판-도구들을-사용자-편의성에-맞게-개선하기)
  - [6. 그림판에 그림 그리는 속도 저하 발생 (트러블 슈팅)](#6-그림판에-그림-그리는-속도-저하-발생-트러블-슈팅)
- [스케줄](#스케줄)
- [기술스택](#기술스택)
- [만든이](#만든이)


<br>

# 시연 영상
[![Video Label](http://img.youtube.com/vi/Pkqbbjya-zc/0.jpg)](https://www.youtube.com/watch?v=Pkqbbjya-zc)
<br>
<a href="https://www.youtube.com/watch?v=Pkqbbjya-zc" target="_blank">
시연 영상 링크
</a>
<br>
오디오가 재생되오니 볼륨 조절해주세요.
<br>

# 기능
<details>
  <summary>1. 만화를 저장하고 불러올 수 있습니다.</summary>
  <div markdown="1">
    <img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/34ae1b55-448f-4add-ae05-f3d2445d4643.gif?raw=true" alt="cms-demo" width="400"/>
  </div>
</details>
<details>
  <summary>2. 사용자가 그림판에서 그림을 그릴 수 있습니다.</summary>
  <div markdown="1">
    <img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/8d5d4fb8-283a-49af-9ccd-5875ebdc5669.gif?raw=true" alt="cms-demo" width="400"/>
  </div>
</details>
<details>
  <summary>3. 그림판에서 색상과 선의 굵기를 지정할 수 있습니다.</summary>
  <div markdown="1">
    <img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/2ee80564-c623-42a9-9737-434b4296e5e3.gif" alt="onLongPress-gif" width="400"/>
  </div>
</details>
<details>
  <summary>4. 사용자가 그렸던 만화를 undo & redo 할 수 있습니다.</summary>
  <div markdown="1">
    <img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/6768faf3-685d-435f-b647-f9ce39446bca.gif" alt="onLongPress-gif" width="400"/>
  </div>
</details>
<details>
  <summary>5. 사용자가 목소리를 녹음하여 오디오를 재생할 수 있습니다.</summary>
  <div markdown="1">
    <img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/8f52f025-1bce-40b8-a3c8-8f8b1af97375.gif?raw=true" alt="cms-demo" width="400"/>
  </div>
</details>

<br>

# 동기
이번 프로젝트의 목표는 그 동안 React를 통해 배운 내용을 기반으로 React Native를 사용하여 앱을 만들어 보는 것이였습니다.<br>
저는 웹툰의 열렬한 독자이면서 더빙하는 것을 좋아합니다. 이 두가지 관심사를 결합한다면 재미있는 앱이 만들어지지 않을까 생각했습니다.
자신만의 4컷 만화를 그리고 각 컷마다 목소리를 녹음하여 만화속의 주인공이 되어볼 수 있고 친구들과 역할을 나눠 역할극을 할 수도 있습니다.<br>

혼자 즐길 수도 있고 모두와 즐길 수 있는 더빙의 효과가 더해진 아이패드용 네컷만화 앱을 만들게 되었습니다.

<br>

# 챌린지
## 1. 데이터 파일을 어떻게 저장해야할까?
데이터를 저장하는 방법으로 클라우드와 로컬이 두가지를 생각했습니다. 


**내가 고려한 옵션**
||클라우드 저장소|로컬 디바이스|
|------|---|---|
|장점|1. 인터넷이 연결된 곳이라면 장소 제약없이 어디에서나 데이터 저장이 가능합니다<br>2. 무제한의 저장소 용량을 제공합니다.|1. 오프라인 파일 저장을 지원하여 인터넷에 연결되어 있지 않을 때에도 데이터를 저장할 수 있습니다.<br>2. 네트워크 대기 시간을 방지하고 기기에 저장된 데이터에 빠른 액세스를 제공합니다.|
|단점|1. 데이터를 저장하려면 인터넷 연결이 필요힙니다.<br>2. 저장소 사용량 및 대역폭에 따라 비용이 발생합니다.|1. 대용량 파일을 저장할 경우 메모리가 낭비될 수 있습니다.<br>2. 기기가 손상될 경우 데이터가 손실될 위험이 있습니다.|

저는 사용자의 로컬 디바이스가 **오프라인인 상태**에서도 쉽게 앱을 사용하도록 하는 것을 중점으로 두었기에 로컬 디바이스에 저장하기로 결정했습니다.

expo에서 제공하는 기능 중에 `expo-file-system`을 사용하여 로컬 디바이스의 파일 서비스를 접근하여 데이터를 저장하였습니다.

<br>
 
### 1) FileSystem의 로컬 디바이스 메모리 문제를 어떻게 해결해야할까?
#### 문제점
이 앱은 만화 페이지별로 각 2개씩(이미지와 오디오), 총 8개의 파일을 로컬 디바이스에 저장해야 합니다. 오디오의 경우 녹음할때 기본 최대 녹음 시간 5분과 음질을 High Quality로 설정해주었기 때문에 파일의 크기가 크게 나왔습니다. <br><br>

#### 기술적 측면 솔루션
- 클라우드 저장소 사용
  - 오프라인도 좋지만 메모리 용량이 부족할 시에는 완성본을 저장을 할 수 없기 때문에 클라우드 저장소에 데이터를 저장함으로써 메모리 문제를 해결할 수 있습니다.<br><br>
#### 사용자 경험 측면 솔루션
- 녹음 시간을 제한
  - 만화 페이지별로 5초를 녹음하면 기본 1MB 이상의 파일 크기가 나왔습니다. 하지만 사용자의 입장에서 녹음 시간이 길수도 짧을 수도 있기에 시간 제한에 불편함을 느낄 것이라 생각했습니다.
- 완성된 만화를 수정할 수 있도록 구현
  - 그림판에서 모든 선의 좌표나 녹음했던 오디오들이 데이터를 모두 저장해야했기에 메모리를 많이 차지하게 됩니다. <br><br>

#### 해결방안: 사용자 경험 측면에서 UX 개선
기술적 측면에서 클라우드 저장소를 사용한다면 메모리 문제를 해결할 수 있지만 저는 사용자 경험 측면에서의 해결책이 더 중요하다고 느꼈습니다.<br>
그래서 아래의 세가지를 구현하였습니다.
- 수정 기능 제거
  - 만화를 그리고 난 후 저장 버튼을 누르면 미리보기 페이지로 넘어갑니다. 만호를 수정하고 싶으면 이전 페이지로 돌아가 수정할 수 있도록 하였습니다. 다만, 저장된 이후에 수정은 불가능합니다.
- 메모리 용량 안내문 모달
  - 만화를 그리기 전과 만화를 저장하기 전, 사용자에게 메모리에 관한 안내문 모달과 총 파일 크기(이미지 + 오디오)를 알려주는 안내문 모달을 보여 사용자에게 메모리 관련하여 주의를 주었습니다.
- 사용자에게 저장된 파일을 삭제하거나 지울 수 있는 옵션을 제공하여 스스로 디바이스 메모리를 관리할 수 있도록 하였습니다.
<img width="400" alt="image" src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/d351962b-9a0b-451a-9345-321ccd17aec5">
<img width="400" alt="image" src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/39c83d14-0713-4d50-aacf-e552a0f5af14">
<img width="400" alt="image" src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/e7893158-e03a-4a1c-9f43-50d8d3db069d">

<br><br>

## 2. 만화 페이지별 이미지와 오디오 상태 관리 및 데이터 구조
#### 문제점
만화 페이지별로 캔버스의 선들과 이미지, 오디오들을 전역으로 상태를 관리해주어야합니다. 그렇기 때문에 상태 구조를 어떻게 설계해야하며 미리보기와 완성 페이지에서 모든 페이지의 데이터를 가져올 수 있을까 고민이 많았습니다. 처음에는 첫번째 페이지, 두번째 페이지… 이렇게 4개의 페이지 상태를 모두 만들었습니다.

```jsx
page1: {
  drawingData: [],
},
page2: {
  drawingData: [],
},
page3: {
  drawingData: [],
},
page4: {
  drawingData: [],
}
```
위의 구조로 작성하니 미리보기 페이지에서 모든 만화 페이지의 데이터를 불러올 때 하나씩 가져와야되는 번거로움이 있어 가독성이 좋지 않았습니다.<br><br>

#### 해결방안: 상태 구조 계층화
데이터 구조에 대해서 공부하면서 리덕스 공식 문서의 상태 정규화를 참고했습니다[(링크)](https://lunit.gitbook.io/redux-in-korean/recipes/structuringreducers/normalizingstateshape)
```jsx
// 리덕스 데이터 구조 예시
page: {
  1: {
    drawingData: [],
  },
  2: {
    drawingData: [],
  },
  3: {
    drawingData: [],
  },
  4: {
    drawingData: [],
  },
},
```

`page`라는 상태를 만들었습니다. 앱 전역에서 상태를 관리할 때 가장 중요한 기준이 되는게 어떤 페이지냐는 것이기 때문입니다. 만화의 페이지별로 이미지와 오디오의 전역 상태를 관리하고 있었기 때문에 페이지에 대한 구분이 필요했습니다.

단순히 `page` 상태를 추가하여 해결하였지만 모든 만화 페이지의 데이터를 불러올 때 필요했던 코드가 4줄에서 1줄로 줄어들었습니다.

**변경 전**
```jsx
const page1 = useSelector(getDrawingPage1);
const page2 = useSelector(getDrawingPage2);
const page3 = useSelector(getDrawingPage3);
const page4 = useSelector(getDrawingPage4);
```
**변경 후**
```jsx
const page = useSelector(getDrawingPages)[currentPage];
```

또 `currentPage`라는 상태를 추가해 유저가 페이지를 이동할 때 어느 페이지에 머물러 있는지 상태로 관리했습니다. 그래야만 현재 유저가 머무를 페이지에 맞게 상태를 관리할 수 있기 때문입니다.

해당 페이지에 관한 데이터들을 불러오거나 저장할시에는 `currentPage`를 통해 `page`의 프로퍼티로 접근합니다.
```jsx
const currentPage = useSelector(getCurrentPage);
const firstPage = useSelector(getDrawingPages)[currentPage];
```

<br>

## 3. 만화 페이지별 그림판 undo, redo
그림판에 그림이 그려지는 원리는 그림판에 선을 그리면 `drawingData` 배열에 선의 좌표들이 추가되면서 리랜더링이 일어나게 됩니다. 그러면 `drawingData` 배열에 들어있는 모든 선들이 `map` 메서드를 통해 다시 그리게 됩니다.<br>
#### 문제점
그림판에 그림이 그려지는 원리를 생각하며 그림의 선들을 어떻게 상태 관리를 해주어야 사용자가 그렸던 그림에 마지막 선을 지우거나 다시 되돌릴 수 있을까? <br><br>

#### 해결방안: 두개의 `Stack` 자료구조 적용
`undo`는 마지막에 그린 선을 삭제하여 과거의 상태로 되돌리는 것을 말하고 `redo`는 삭제했던 선을 복구 시키는 것을 말합니다. <br>
캔버스에 그려진 선들은 모두 `drawingData` 배열에 들어있습니다.  두개의 `Stack` 구조를 이용하여 `drawingData` 배열의 요소들을 빈 배열인 `redoData`에 `push()`와 `pop()` 메서드를 사용하여 `undo`, `redo`를 구현하였습니다.

<br>

![image](https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/510245df-ea7c-475f-81c3-b6552625dc89)

`undo` 버튼을 클릭하면 `drawingData` 배열의 마지막 요소를 `redoData` 배열에 `push` 하도록 하였습니다. 그러면 리덕스의 상태가 변경이 되면서 리랜더링이 일어나므로 마지막 선을 뺀 모든 선을 다시 그리게 되면서 마지막에 그린 선을 제외한 이전에 그렸던 선들이 화면에 나오게 됩니다.

```jsx
//undo 버튼을 클릭했을 때
setPathUndo: (state, action) => {
  const { currentPage, restPaths, lastPath } = action.payload;
  state.page[currentPage].drawingData = restPaths;
  state.page[currentPage].redoData = [
    ...state.page[currentPage].redoData,
    lastPath,
  ];
},
```
<br>

`redo` 버튼을 클릭한다면 `redoData` 배열의 마지막 요소가 `drawingData` 배열에 `push` 되면서 리렌더링이 일어납니다. 그러면 `redoData` 배열에 있던 마지막 선이 `drawingData` 배열에 추가되면서 그림판에서 지워졌던 선이 다시 복구되어 보여집니다. 

```jsx
//redo 버튼을 클릭했을 때
setPathRedo: (state, action) => {
  const { currentPage, restPaths, lastPath } = action.payload;
  state.page[currentPage].drawingData = [
    ...state.page[currentPage].drawingData,
    lastPath,
  ];
  state.page[currentPage].redoData = restPaths;
},
```
<img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/6768faf3-685d-435f-b647-f9ce39446bca.gif" alt="onLongPress-gif" width="400"/>

<br><br>

## 4. 오디오 관련 반복 로직을 줄이자
#### 문제점
미리보기 페이지와 완성된 만화 페이지의 각 구성요소마다 오디오를 재생하거나 중지하는 함수가 있습니다.
```jsx
  const sound = new Audio.Sound();
  await sound.loadAsync({ uri: recording.file });
  await sound.replayAsync();
  setIsPlaying(true);
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  });
```
이미지를 클릭했을 때와 오디오 재생 아이콘을 클릭했을 때 발생하는 이벤트 핸들러에서 사용됩니다. 즉, 구성 요소 하나에 함수가 두번 반복 사용되고 있습니다. 오디오를 불러올때의 넘겨주는 uri만 다를 뿐 로직은 비슷하여
이 공통되는 부분을 추출하여 재사용하려고 합니다.
<br><br>

#### 해결방안: Custom hook으로 추출
공식문서를 참고하여 커스텀 훅을 구현하였습니다.([링크](https://ko.react.dev/learn/reusing-logic-with-custom-hooks#passing-event-handlers-to-custom-hooks))

Hook의 이름은 항상 `use`로 시작해야하기때문에 `useAudioPlay`라는 이름의 함수를 정의해주었습니다.<br>
커스텀 훅에는 각각 오디오 재생, 오디오 재생 중지 및 오디오 상태 검색 기능을 제공하는 `playAudio` 함수, `stopAudio` 함수 및 `getStatus` 함수가 포함되어 있습니다.

```jsx
function useAudioPlay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const lastRecording = useRef(null);

  const playAudio = async (recordingUri) => {...};
  const stopAudio = async () => {...};
  const getStatus = async () => {...};

  return {
    isPlaying,
    playAudio,
    stopAudio,
    getStatus
  };
};
```
- playAudio 함수 : 매개변수를 받은 `recoringUri`을 통해 오디오를 재생시킵니다.
  ```jsx
  const playAudio = async (recordingUri) => {
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri: recordingUri });
    await sound.replayAsync();
    setIsPlaying(true);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
    lastRecording.current = sound;
  };
  ```
- stopAudio 함수 : 현재 재생되는 오디오가 있을 경우 오디오 재생을 중지시킵니다.
  ```jsx
  const stopAudio = async () => {
    if (lastRecording.current) {
      await lastRecording.current.stopAsync();
    }
  };
  ```
- getStatus 함수 : 현재 재생되는 오디오가 있을 경우 오디오 관련 데이터를 반환합니다.
  ```jsx
  const getStatus = async () => {
    if (lastRecording.current) {
      const status = await lastRecording.current.getStatusAsync();
      return status;
    }
    return null;
  };
  ```
<br>

함수의 리턴값으로 `isPlaying` 함수, `playAudio` 함수, `stopAudio` 함수와 `getStatus` 함수의 반환값을 받은 컴포넌트가 오디오의 재생 기능들을 읽을 수 있도록 하였습니다.

```jsx
const { isPlaying, playAudio, stopAudio, getStatus } = useAudioPlay();
```

=> 반복 로직을 커스텀 훅으로 추출하여 컴포넌트 간의 코드의 중복을 줄임으로써 재사용성을 높이고 유지 보수를 용이하게 하였습니다.

<br><br>

## 5. 사용자 경험 고민들

### 1) 어떻게 사용자에게 해당 페이지의 오디오가 재생되고 있음을 알려줄 수 있을까? 
미리보기 페이지나 완성된 만화 페이지에서 전체 오디오 버튼을 눌렀을때나 각각의 페이지들을 클릭했을때 어떤 페이지의 오디오가 나오는지 사용자에게 알려주기 위해서 `border` 스타일을 주려고 했습니다. 

#### 문제점
문제는 전체 오디오를 클릭했을 경우였습니다. 오디오가 재생될때 재생되는 동안 스타일이 적용되었다가 재생이 끝나면 스타일이 해제되도록 구현하고 싶었습니다.
하지만 오디오는 순서대로 재생이 되지만 `border` 스타일은 오디오 시간을 무시한채 빠르게 페이지마다 적용되고 끝나버렸습니다.<br><br>

#### 해결방안: 오디오 재생 상태 모니터링
공식문서와 인터넷 서치를 하다 `expo-av`의 audio API에 `sound` 개체의 `setOnPlaybackStatusUpdate` 메서드를 사용하면 오디오의 재생 상태를 모니터링 할 수 있다는 것을 알게 되었습니다.

```jsx
  const sound = new Audio.Sound();
  await sound.loadAsync({ uri: recording.file });
  await sound.replayAsync();
  setIsPlaying(true);
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  });
```

오디오의 재생 상태가 업데이트되면 `status` 개체의 `didJustFinish` 속성이 `true`인지 확인합니다. 이 속성은 오디오 재생이 방금 끝났는지 여부를 나타내는 부울 값입니다. `didJustFinish` 속성이 `true`이면 오디오 재생이 종료됐음을 의미하므로 `isPlaying` 상태를 `false`로 설정하여 스타일이 적용이 안되도록 하였습니다.<br>

그리고 페이지와 페이지 사이에 재생되는 오디오가 빠르게 넘어가는 느낌을 받아 `setTimeout`을 추가하여 오디오 재생이 끝난후에 0.5초 간격을 주어 바로 재생되지 않도록 하여 자연스럽게 넘어가도록 구현하였습니다
```jsx
// 오디오 재생이 끝나면 0.5초 대기시간 추가
await new Promise((resolve) =>
  setTimeout(resolve, recording.duration + 500),
);
```

<img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/fca75739-8b2e-4748-9957-9176c528321d.gif?raw=true" alt="cms-demo" width="500"/><br>

<br><br>

### 2) 재생되고 있는 오디오를 멈추고 다른 오디오를 재생시킬 수 있을까?
미리보기 페이지에서 페이지별로 이미지를 누르면 이벤트가 발생하여 해당 이미지와 연결된 오디오 녹음이 재생되도록 만들었습니다.
사용자 입장에서 오디오를 듣다가 다른 오디오를 듣고 싶을 수 있기 때문에 이 문제를 해결하기 위해 조건은 아래와 같습니다.
- 오디오는 무조건 하나만 재생되하며 오디오끼리 겹쳐서는 안된다.
- 같은 이미지를 여러번 클릭했을 경우 해당하는 페이지의 오디오가 다시 재생되어야 한다.

#### 문제점
여기서 문제가 있었습니다. 이전에 녹음된 오디오와 새 오디오를 어떻게 구별해야하나 고민이였습니다. 상태 변수로 이전에 녹음된 오디오를 저장해야될지 `useRef`에 저장하여 이전 오디오를 참조될지 결정해야했습니다.

#### 시도
|일반 상태 변수|useRef(참조 변수)|
|---|---|
|1. `useState` hook을 사용하여 선언해야 한다.<br>2. 상태 변수를 변경하면 구성 요소가 재랜더링된다.<br>3. 상태 업데이트는 비동기이기에 후속 코드 실행에 즉시 반영되지 않을 수 있다.|1. `Ref` 값을 변경해도 구성 요소가 리랜더링되지 않는다.<br>2. `Ref` 업데이트는 후속 코드 실행에서 동시에 액세스할 수 있다.|

#### 해결방안: `useRef`를 활용하여 오디오 참조
리렌더링을 최소화하기 위해 구성 요소를 다시 렌더링하지 않고도 액세스하여 수정할 수 있는 `useRef`를 사용하기로 했습니다.

```jsx
  const lastRecording = useRef(null);
  
  if (lastRecording.current) {
    await lastRecording.current.stopAsync();
  }
  if (recording) {
    const sound = new Audio.Sound();
    lastRecording.current = sound;
  }
```

`useRef` hook을 사용하여 `lastRecording.current`에 `Audio.Sound` 개체를 저장함으로써 구성 요소의 다시 렌더링을 트리거하지 않고 새 오디오가 재생될 때 이전 오디오 재생에 쉽게 액세스하고 중지할 수 있습니다.

<br>

아래는 `handleImagePress` 함수 코드입니다.
```jsx
const lastRecording = useRef(null);

const handleImagePress = async (page) => {
      const recordings = audioPages[page].audioData;
      const recording = recordings[recordings.length - 1];

      if (lastRecording.current) {
        await lastRecording.current.stopAsync();
      }

      if (recording) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: recording.file });
        await sound.replayAsync();
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        lastRecording.current = sound;
      }
      setSelectedPage(page);
    };
```
1) 이전에 녹음된 오디오가 있는 경우, `lastRecording.current` 객체에서 `stopAsync()`를 호출하여 오디오 재생을 중지시킵니다.
2) 사용 가능한 새 오디오가 있는 경우, 새 `Audio.Sound` 객체를 생성하고 `loadAsync()`를 사용하여 recording.file URI에 지정된 오디오 파일을 로드합니다.
3) 오디오를 로드한 후 코드는 사운드 객체에서 `replayAsync()`를 호출하여 오디오 재생을 시작합니다.
4) 새 오디오를 `lastRecording.current` 객체에 저장합니다.

<br>

### 3) 그림판 도구들을 사용자 편의성에 맞게 개선하기
#### 문제점
선의 굵기와 색상을 제한된 UI에 Static하게 구현하면 UI/UX적으로 복잡하고 보기에 좋지 않다고 생각했습니다.
<br><br>

#### 해결방안: 하나의 그림판 도구에 두가지 이벤트 적용
React Native의 `Pressable` 태그를 사용하여 하나의 `icon` 태그에 두가지 상호작용이 가능하도록 만들었습니다. 
`Pressable` 태그에 `onPress`와 `onLongPress` 옵션을 추가하여 `icon`을 길게 눌렀을때와 짧게 눌렀을때의 이벤트를 발생시킵니다.
- onPress : 아이콘을  짧게 눌렀을 때 툴 선택 가능합니다.
- onLongPress : 아이콘을 길게 눌렀을 때 색상이나 선 굵기의 세부 설정하는 모달이 뜹니다.
```jsx
<Pressable
  name="pen"
  onPress={() => {
    currentModal("width");
  }}
  onLongPress={() => {
    isShowModal();
    currentModal("width");
  }}
>
```

<img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/2ee80564-c623-42a9-9737-434b4296e5e3.gif" alt="onLongPress-gif" width="400"/>
<img src="https://github.com/Mytoontalk-Project/Mytoontalk/assets/78009532/0d316329-f88d-4f23-a102-4ad4a9034e2e.gif" alt="onLongPress-eraser-gif" width="400"/>

<br><br>

## 6. 그림판에 그림 그리는 속도 저하 발생 (트러블 슈팅)
#### 문제점
그림판에 그림을 그릴수록 프레임 속도가 저하되는 현상이 발생하였습니다. 그림을 그리는 양이 적을 때는 문제가 없었지만 많은 양의 그림을 그릴수록 프레임 저하가 심해졌습니다.<br><br>

#### 원인
- key로 uuid사용 → 그림 그리는 프레임 속도 저하

```jsx
const drawing = paths?.map((p, i) => (
    <Path
      key={uuid}
      path={p.segments.join(" ")}
      strokeWidth={p.penWidth}
      style="stroke"
      strokeJoin="round"
      strokeCap="round"
      color={p.color}
    />
  ));
```

왜 저하가 되었을까?

UUID를 `<Path>` 요소의 키로 사용하면 구성 요소의 각 렌더링에 대해 새 UUID가 자주 생성됩니다. 결과적으로 React는 내용이 변경되지 않은 경우에도 조정 프로세스 중에 각 요소를 새 것으로 인식해 렌더링 성능에 영향을 미칩니다.

조정 프로세스는 React가 가상 DOM과 실제 DOM을 비교하고 변경 사항을 업데이트하는 것을 말합니다. 요소가 업데이트되면 React는 diffing 알고리즘을 통해 새 키와 이전 키를 비교하여 요소를 업데이트하거나 교체 또는 삽입할지 여부를 결정합니다.
<br><br>

#### 시도
- 고유한 식별자 사용 -> 프레임 속도 저하 해결<br>

**`currentPage`** 및 **`i`**  값의 조합을 키로 사용하여 안정적이고 고유한 식별자를 사용

```jsx
key={`page${currentPage}${i}path`}
```
<br>

- `useMemo hook`을 사용 → 렌더링 최적화

무엇이 캐싱되었을까?<br>
`useMemo` hook은 `drawing` 변수를 메모합니다. `drawing` 변수는 캔버스에 그려질 경로를 나타내는 JSX 요소입니다. `paths` 배열에서 `map` 함수를 사용하여 생성됩니다.

그리기 동작 중에 새로운 좌표와 선의 정보로 paths 배열을 업데이트합니다. `useMemo` hook은 paths 배열을 통해 생성된 JSX 요소를 메모하여 불필요한 재연산을 피함으로써 렌더링 성능을 최적합니다. 경로를 나타내는 JSX 요소는 캔버스에서 <Path> 구성 요소로 렌더링됩니다.

```jsx
const drawing = useMemo(
  () =>
    paths?.map((p, i) => (
      <Path
        key={`page${currentPage}${i}path`}
        path={p.segments.join(" ")}
        strokeWidth={p.penWidth}
        style="stroke"
        strokeJoin="round"
        strokeCap="round"
        color={p.color}
      />
    )),
  [paths, currentPage],
);
```

  - 렌더링 간에 의존성 배열(`paths` 또는 `currentPage`)이 동일하게 유지되면 paths 배열을 캔버스에 그릴 경로를 나타내는 JSX 요소가 캐시되어 반환되고 이 동작은 다시 실행되지 않습니다.
  - 그리기 동작으로 인해 `paths` 배열이 변경되면 이 작업이 다시 트리거되어 업데이트된 JSX 요소를 생성합니다.
<br>

이 최적화를 통해 의존성 배열이 변경되지 않은 경우 불필요한 계산 및 렌더링을 줄임으로써 성능을 저하를 줄였습니다.<br><Br>
    

#### 결과 : `useMemo`의 잘못된 사용
`useMemo`를 언제 사용해야하나?<br>
의존성 배열이 변경되는 경우에 연산된 값을 캐시하고 반환합니다. 그 다음에 의존성 배열이 변경되지 않았을 경우 이전 연산의 반환된 캐시된 값을 재사용하여 연산을 하지 않습니다.

=> 그림 그리는 기능을 제외한 이외의 기능들로 인한 리렌더링에서는 캐시된 값을 재사용하여 불필요한 계산을 줄일 수 있지만

이 프로젝트의 경우 `paths` 배열이 그림을 그릴때마다 값이 변경되어 리렌더링이 자주 일어나게됩니다. 렌더링이 자주 일어나면 JSX 요소도 새로 만들어지게 되어 `useMemo`를 사용하여도 효과를 보지 못합니다. 

그래서 불필요한 `useMoemo`를 제거하였습니다.

<br>

# 스케줄
프로젝트 기간 : 2023.04.03 ~ 2023.04.23
<details>
<summary>1주차 : 기획 및 설계</summary>

- 아이디어 수집
- 기술 스택 선정
- Figma를 사용한 Mockup 제작
- Notion을 이용한 칸반 작성
</details>
<details>
<summary>2주차 ~ 3주차 : 기능 개발</summary>

- react native 공식 문서 학습
- react native expo 프론트 엔드 구현
- react native skia를 적용하여 캔버스 구현
- 그림판 undo, redo 구현
- 개인 프로젝트 발표 준비
</details>

<br>

# 기술스택
### 앱 / 프론트엔드
- Expo(React native)

React Native의 두가지 개발 방법에는 Expo CLI 방식과 React Native CLI 방식이 있습니다.
|Expo CLI|React Native CLI|
|---|---|
RN을 쉽게 개발할 수 있도록 도와주는 툴이며 배포가 쉽습니다. 다만 섬세한 제어를 못한다는 것과 Expo 모듈만 사용이 가능하여 모듈 제한이 있습니다.(네이티브 모듈 X)|원하는 기능이나 모든 요소들을 제어할 수 있지만 초기 사용자 설정 과정이 복잡하다.|

=> 빠른 프로젝트 생성과 macOS와 안드로이드 기기없이 Expo 앱을 통해 쉽게 앱을 개발할 수 있는 것을 고려하여 Expo로 앱을 개발하였습니다.
<br>

### 주요 사용 라이브러리
- react-native-skia : Skia 그래픽 API(Expo에서 지원 가능)
- expo-file-system : 로컬 디바이스 파일 접근하는 Expo API
- expo-av : 오디오를 녹음하는 Expo API

<br>

# 만든이
장예진 : [skyaiwn08@gmail.com](mailto:skyaiwn08@gmail.com)
