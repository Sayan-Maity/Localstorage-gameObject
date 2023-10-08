import { Button, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useTheme, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

function Dashboard() {
  const theme = useTheme()
  const toast = useToast();
  const [localData, setLocalData] = useState([]);
  const [userName, setUserName] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateItemUrl, setUpdateItemUrl] = useState('');
  const [updateItemAuthor, setUpdateItemAuthor] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure() // modal (Edit only)
  const { isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: closeSecond } = useDisclosure() // modal (View Only)
  const [viewSelectedItem, setViewSelectedItem] = useState({}); // modal (View Only)

  useEffect(() => {
    const storedData = localStorage.getItem('gameData');
    if (storedData) {
      setLocalData(JSON.parse(storedData));
    }
  }, []);

  const handleSaveData = () => {
    if (!userName || !url || !author) {
      let errorMessage = null;

      if (!userName) {
        errorMessage = "Please enter the game name!";
      } else if (!url) {
        errorMessage = "Please enter the game url";
      } else if (!author) {
        errorMessage = "Please enter author name!";
      }

      if (errorMessage) {
        toast({
          title: errorMessage,
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
        return;
      }
    } else {

      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: false,
      };
      const IST_Date_Time = new Date().toLocaleString('en-US', options);
      setDate(IST_Date_Time);

      // Game object :
      const data = {
        id: Math.random(),
        name: userName,
        url: url,
        author: author,
        published_date: IST_Date_Time,
      };

      setLocalData([...localData, data]);
      localStorage.setItem('gameData', JSON.stringify([...localData, data]));

      setUserName('');
      setUrl('');
      setAuthor('');

      toast({
        title: "Game created successfully!",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
    }

  };

  const openModal = (item) => {
    // console.log(item);
    setSelectedItem(item);
    setUpdateItemName(item.name);
    setUpdateItemUrl(item.url);
    setUpdateItemAuthor(item.author);
  }
  const openModalSecond = (item) => {
    // console.log(item);
    setViewSelectedItem(item);
  }

  const handleUpdateData = () => {
    if (selectedItem) {
      const itemIndex = localData.findIndex(item => item.id === selectedItem.id);
      if (itemIndex !== -1) {
        const updatedData = [...localData];
        updatedData[itemIndex].name = updateItemName;
        updatedData[itemIndex].url = updateItemUrl;
        updatedData[itemIndex].author = updateItemAuthor;

        setLocalData(updatedData);
        localStorage.setItem('gameData', JSON.stringify(updatedData));

        setSelectedItem(null);
        setUpdateItemName('');
        setUpdateItemUrl('');
        setUpdateItemAuthor('');
      }
    }
  }

  const handleDeleteItem = (itemId) => {
    const filteredData = localData.filter(item => item.id !== itemId);
    setLocalData(filteredData);

    localStorage.setItem('gameData', JSON.stringify(filteredData));

    toast({
      title: "Game deleted successfully!",
      variant: "left-accent",
      position: "top",
      isClosable: true,
      duration: 2000,
      status: "success",
    });
  };


  return (
    <Flex p="2rem 0" flexDir="column" alignItems="center" justifyContent="flex-start" width="100%"
      h="100vh" overflowY="scroll">
      <Flex flexDir="row" justifyContent="flex-start" w="100%">
        <Flex borderRight="1px solid #bebebe" h="90vh" flexDir="column" p="3rem" gap="1rem">
          <Heading>Create Game</Heading>
          <Input
            placeholder="Enter game name*"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
          />
          <Input
            placeholder="Give the URL*"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
          />
          <Input
            placeholder="Enter your name*"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
          />
          <Button onClick={handleSaveData}
            gap="0.5rem"
            borderRadius="20px"
            transition={"all 0.3s ease"}
            color={theme.colors.button.dark_color}
            backgroundColor={theme.colors.button.dark_backgroundColor}
            _hover={{
              backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
              transform: `${theme.colors.button.hover_transform}`,
            }}
            _active={{
              backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
            }}
          >
            Create
          </Button>
        </Flex>
        <Flex gap="1rem" flexDir="column" p="3rem">
          <Heading>View all Games</Heading>
          <Flex gap="1rem" flexDir="row" flexWrap="wrap" >
            {localData.length === 0 ? ("No Games Found, please create one !") : (localData.map((item) => (
              <Flex flexDir="column" cursor="pointer" h="fit-content" border="1px solid #bebebe" p="2rem" borderRadius="10px" key={item.id} alignItems="center" gap="1rem">
                <Text >{item.name}</Text>
                <Flex gap="1rem">
                  <Button onClick={() => handleDeleteItem(item.id)}
                    gap="0.5rem"
                    borderRadius="20px"
                    transition={"all 0.3s ease"}
                    color={theme.colors.button.dark_color}
                    backgroundColor={theme.colors.button.dark_backgroundColor}
                    _hover={{
                      backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                      transform: `${theme.colors.button.hover_transform}`,
                    }}
                    _active={{
                      backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
                    }}
                  >
                    Delete
                  </Button>
                  <Button onClick={() => { onOpen(); openModal(item); }}
                    gap="0.5rem"
                    borderRadius="20px"
                    transition={"all 0.3s ease"}
                    color={theme.colors.button.dark_color}
                    backgroundColor={theme.colors.button.dark_backgroundColor}
                    _hover={{
                      backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                      transform: `${theme.colors.button.hover_transform}`,
                    }}
                    _active={{
                      backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => { onOpenSecond(); openModalSecond(item); }}
                    gap="0.5rem"
                    borderRadius="20px"
                    transition={"all 0.3s ease"}
                    color={theme.colors.button.dark_color}
                    backgroundColor={theme.colors.button.dark_backgroundColor}
                    _hover={{
                      backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                      transform: `${theme.colors.button.hover_transform}`,
                    }}
                    _active={{
                      backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
                    }}
                  >
                    View
                  </Button>
                </Flex>
              </Flex>
            )))}
          </Flex>
        </Flex>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="1rem">
            <Input
              type="text"
              value={updateItemName}
              onChange={(e) => setUpdateItemName(e.target.value)}
              placeholder="Update your game name"
              _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
            />
            <Input
              type="text"
              value={updateItemUrl}
              onChange={(e) => setUpdateItemUrl(e.target.value)}
              placeholder="Update your url"
              _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
            />
            <Input
              type="text"
              value={updateItemAuthor}
              onChange={(e) => setUpdateItemAuthor(e.target.value)}
              placeholder="Update author name"
              _focus={{ borderColor: "#8b3dff", boxShadow: "none" }}
            />
          </ModalBody>
          <ModalFooter >
            <Button onClick={() => { handleUpdateData(); onClose(); }}
              gap="0.5rem"
              borderRadius="20px"
              transition={"all 0.3s ease"}
              color={theme.colors.button.dark_color}
              backgroundColor={theme.colors.button.dark_backgroundColor}
              _hover={{
                backgroundColor: `${theme.colors.button.hover_dark_backgroundColor}`,
                transform: `${theme.colors.button.hover_transform}`,
              }}
              _active={{
                backgroundColor: `${theme.colors.button.active_dark_backgroundColor}`,
              }}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={closeSecond} isOpen={isOpenSecond} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" gap="1rem">
            <Text>Unique Id : {viewSelectedItem?.id}</Text>
            <Text>Game Name : {viewSelectedItem?.name}</Text>
            <Text>Author Naeme : {viewSelectedItem?.author}</Text>
            <Text>Url : {viewSelectedItem?.url}</Text>
            <Text>Published Date : {viewSelectedItem?.published_date}</Text>
          </ModalBody>
          <ModalFooter >
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default Dashboard
