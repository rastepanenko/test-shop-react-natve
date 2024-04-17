import { FlatList, View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import useProducts from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { IProduct, IProductFocus, Tag } from "../../types/Types";
import { initialTags } from "../../mock/SearchTags";
import { Chip } from "./search/Chip";
import Loader from "../components/ui/Loader";
import { TextInput } from "react-native-paper";
import DetailsModal from "./DetailsModal";

export default function Catalog() {
    const {
        getProducts,
        products,
        errorMessage,
        isLoading,
    } = useProducts();
    const [tags, setTags] = useState(initialTags);
    const [searchArray, setSearchArray] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<IProduct[]>()
    const [filteredResults, setFilteredResults] = useState<IProduct[]>()
    const [searchString, setSearchString] = useState('');
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [focusProduct, setFocusProduct] = useState<IProductFocus>();

    useEffect(() => {
        setSearchResults(products);
        setFilteredResults(products);
    }, [products])

    useEffect(() => {
        if (searchArray.length == 0) {
            setFilteredResults(products);
        } else {
            searchArray.map((t: string) => {
                setFilteredResults(filteredResults?.filter((p: IProduct) => p.title.toLowerCase().includes(t.toLowerCase())));
            });
        }
    }, [searchArray])

    useEffect(() => {
        setSearchResults(filteredResults?.filter((item) => item.title.toLowerCase().includes(searchString.toLowerCase())))
    }, [searchString, filteredResults])

    useEffect(() => {
        setIsDetailsVisible(true);
    }, [focusProduct])

    const toggleTag = (tag: Tag) => {
        tag.isSelected = !tag.isSelected;

        const otherTags = tags.filter(t => t.name != tag.name);

        if (tag.isSelected) {
            setSearchArray(prev => [...prev, tag.name]);
            setTags([tag].concat(otherTags));
        } else {
            const otherSelectedTags = otherTags.filter(t => t.isSelected);
            const otherNotSelectedTags = otherTags.filter(t => !t.isSelected);
            const newTags = otherSelectedTags
                .concat([tag])
                .concat(otherNotSelectedTags)
                ;
            setTags(newTags);
            setSearchArray(searchArray.filter((item) => item != tag.name));
        }
    };

    const tagChips = tags.map(t => (
        <View key={t.name} style={{ marginHorizontal: 5, }}>
            <Chip text={t.name} isSelected={t.isSelected} onPress={() => toggleTag(t)} />
        </View>
    ));

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Loader size={100} color={'black'} />
        </View>
    }

    return (
        <View style={styles.container}>
            {!focusProduct?.isFocused
                ? null
                : <DetailsModal visible={isDetailsVisible} setVisible={setIsDetailsVisible} focusProduct={focusProduct} setFocusProduct={setFocusProduct} />
            }
            <TextInput
                style={styles.searchInput}
                left={<TextInput.Icon icon={'magnify'} />}
                underlineStyle={{ display: 'none' }}
                onChangeText={setSearchString}
            />
            <View style={styles.tagsContainer}>
                <ScrollView
                    style={{ height: 40, }}
                    horizontal={true}
                    alwaysBounceVertical={false}
                    alwaysBounceHorizontal={false}
                    bounces={false}
                    bouncesZoom={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    {tagChips}
                </ScrollView>
            </View>
            <FlatList
                style={{ width: '90%', }}
                contentContainerStyle={{ alignItems: searchResults?.length == 1 ? 'flex-start' : 'center', }}
                data={searchResults}
                numColumns={2}
                horizontal={false}
                renderItem={(item) => {
                    return (
                        <TouchableOpacity
                            style={[styles.itemContainer, { width: searchResults?.length == 1 ? '60%' : '45%', }]}
                            onPress={() => setFocusProduct({ product: item.item, isFocused: true, })}
                        >
                            <ProductItem product={item.item} />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => <Text style={styles.emptyStateText}>No products found</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    searchInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'black',
        marginTop: 70,
        backgroundColor: 'white',
        height: 43,
        borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
    },
    tagsContainer: {
        width: '90%', 
        marginTop: 30,
    },
    itemContainer: { 
        margin: 10, 
        height: 200, 
        shadowOpacity: 3, 
        shadowColor: 'gray', 
        shadowOffset: { width: 3, height: 3 }
    },
    emptyStateText: {
        fontWeight: '500', 
        fontSize: 20, 
        color: 'gray', 
        textAlign: 'center',
    }
})