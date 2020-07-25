class A(object):

    def attributes_to_str(self) -> str:
        '''
        返回自行定义的属性信息
        '''
        attributes_name = list(filter(lambda x: x.find('__') == -1 and not callable(self.__getattribute__(x)), self.__dir__()))
        return '\n'.join(map(lambda x: x+'='+str(self.__getattribute__(x)), attributes_name))
        
    def attributes_to_dict(self) -> dict:
        '''
        返回自行定义的属性信息
        '''
        attributes_name = list(filter(lambda x: x.find('__') == -1 and not callable(self.__getattribute__(x)), self.__dir__()))
        attributes_value = map(lambda x: self.__getattribute__(x), attributes_name)
        return dict(zip(attributes_name, attributes_value))



if __name__ == "__main__":
    a = A()
    a.z = 1
    a.y = 2
    print(a.attributes_to_str())